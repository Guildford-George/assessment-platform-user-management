import { AccountStatus, UserCreatedBy } from "../../generated/prisma/enums";
import {
    createUserDto,
    createUserEntity,
    OrganizationUserDto,
    UpdateUserRoleDto,
} from "../lib/dtos/userDto";
import UserRepository from "../repository/userRepository";
import ProducerFactory from "../lib/kafka/publish/producerFactory";
class UserService {
    static async getOrganizationUsers(organizationId: string) {
        const users = await UserRepository.getOrganizationUsers(organizationId);
        const response  = users.map((user) => {
            const {
                age,
                email,
                first_name,
                id,
                last_name,
                profile_image,
                organization_links,
            } = user;
            const { created_at, status, role, updated_at } = organization_links[0];
            return {
                id,
                email,
                first_name,
                last_name,
                age,
                profile_image,
                created_at,
                updated_at,
                status,
                role_id: role.id,
                role: role.name,
            };
        });

        return response;
    }

    static async createOrganizationUser(createUserDto: createUserDto) {
        let user = await UserRepository.getUserByEmail(createUserDto.email);
        const createUserEntity: createUserEntity = {
            first_name: createUserDto.firstName,
            last_name: createUserDto.lastName,
            email: createUserDto.email,
            role_id: createUserDto.roleId,
            organization_id: createUserDto.organizationId,
        };
        if (!user) {
            user = await UserRepository.createNewUser(createUserEntity);
        } else {
            user = await UserRepository.createUserExisting(createUserEntity);
        }

        // report event
        await ProducerFactory.newOrganizationUserEvent({
            user,
            organizationId: createUserDto.organizationId,
            roleId: createUserDto.roleId,
        });

        // continue when email server and kafka is setup
        return this.getOrganizationUser(user.id, createUserDto.organizationId);
    }

    static async getOrganizationUser(userId: string, organizationId: string) {
        const user = await UserRepository.getOrganizationUser(
            userId,
            organizationId,
        );
        const {
            email,
            first_name,
            last_name,
            age,
            profile_image,
            organization_links,
            id,
        } = user!;
        const { role, created_at, status, updated_at } = organization_links[0];
        return {
            id,
            email,
            first_name,
            last_name,
            profile_image,
            age,
            role_id: role.id,
            role: role.name,
            status,
            created_at,
            updated_at,
        }
    }

    static async updateOrganizationUserRole(
        updateUserRoleDto: UpdateUserRoleDto,
    ) {
        const { roleId, organizationId, userId } = updateUserRoleDto;
        await UserRepository.updateOrganizationUser(
            userId,
            organizationId,
            { role_id: roleId },
        );
        // report event
        await ProducerFactory.updateOrganizationUserEvent(updateUserRoleDto);
        return this.getOrganizationUser(
            updateUserRoleDto.userId,
            updateUserRoleDto.organizationId,
        );
    }

    static async deactiveOrganizationUser(deactiveUserDto: OrganizationUserDto) {
        const { organizationId, userId } = deactiveUserDto;
        const status= AccountStatus.DEACTIVED
        await UserRepository.updateOrganizationUser(userId, organizationId, {status});

        // report event
        await ProducerFactory.organizationUserStatusEvent({
            organizationId,userId,status
        })
        return this.getOrganizationUser(userId, organizationId);
    }
    static async activateOrganizationUser(deactiveUserDto: OrganizationUserDto) {
        const { organizationId, userId } = deactiveUserDto;
        const status= AccountStatus.ACTIVE
        await UserRepository.updateOrganizationUser(userId, organizationId, {status});
        return this.getOrganizationUser(userId, organizationId);
    }

    static async deleteOrganizationUser(deleteUserDto: OrganizationUserDto) {
        const { organizationId, userId } = deleteUserDto;
        const user = (await UserRepository.getOrganizationUser(
            userId,
            organizationId,
        ))!;
        if (user.created_by_type === UserCreatedBy.USER) {
            await UserRepository.deleteOrganizationUser(userId, organizationId);
            // report event
            await ProducerFactory.deleteOrganizationUserEvent({organizationId,userId})
        } else {
            await UserRepository.deleteUser(userId);

            // report event
            await ProducerFactory.deleteUserEvent({organizationId, userId})
        }

    }
}

export default UserService;

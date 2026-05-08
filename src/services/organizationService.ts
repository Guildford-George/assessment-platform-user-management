import { Organization, User } from "../../generated/prisma/client";
import { AccountStatus } from "../../generated/prisma/enums";
import { DEFAULT_ROLES } from "../lib/constants/role";
import { CreateOrganizationDto, CreateOrganizationEntity, UpdateOrganizationDto} from "../lib/dtos/organizationDto";
import { createUserEntity } from "../lib/dtos/userDto";
import RoleHttp from "../lib/http/role";
import ProducerFactory from "../lib/kafka/publish/producerFactory";
import OrganizationRepository from "../repository/OrganizationRepository";
import Transaction from "../repository/transactionRepository";
import UserRepository from "../repository/userRepository";

class OrganizationService {
    static async createOrganization(createOrganizationDto: CreateOrganizationDto){
        let user= await UserRepository.getUserByEmail(createOrganizationDto.email)
        const role= await RoleHttp.getDefaultRoleByRoleName(DEFAULT_ROLES.ORG_OWNER)
        
        
        if(!user){
            const organizationOwner= await Transaction.createOrganizationWithUser({
                admin_email: createOrganizationDto.email,
                name: createOrganizationDto.name,
                role_id: role.id,
                role_name: role.name
            })
            await ProducerFactory.createOrganizationEvent(organizationOwner)
            return organizationOwner
        }
        const createOrganizationEntity: CreateOrganizationEntity= {
        admin_email: createOrganizationDto.email,
        name: createOrganizationDto.name,
        role_id: role.id,
        role_name: role.name,
        user_id: user.id
    }

        const organization= await OrganizationRepository.createOrganizationLinkUser(createOrganizationEntity)
        const organizationOwner= {
            organization, user
        }
        

        // report event
        await ProducerFactory.createOrganizationEvent(organizationOwner)

        return organizationOwner.organization
    }
    static async updateOrganization(organizationId: string,updateOrganizationDto: UpdateOrganizationDto){
        const {logo,name}= updateOrganizationDto
        return OrganizationRepository.updateOrganization(organizationId, {logo,name})
    }
    static async getOrganizationList(name: string){
        return OrganizationRepository.getOrganizationList(name)
        
    }
    static async getOrganization(organizationId: string){
        return OrganizationRepository.getOrganization(organizationId)
    }

    static async deleteOrganization(organizationId: string){
        const organizationUser= await UserRepository.getOrganizationUsers(organizationId)
        const organization= await OrganizationRepository.deleteOrganization(organizationId)

        // report event
        await ProducerFactory.deleteOrganizationEvent({organization, users: organizationUser})

        return organization
    }

    static async activateOrganization(organizationId: string){
        const organization= await OrganizationRepository.updateOrganizationStatus(organizationId, AccountStatus.ACTIVE)
        const organizationUser= await UserRepository.getOrganizationUsers(organizationId)

        // report event
        await ProducerFactory.organizationStatusEvent({organization, users: organizationUser, status:AccountStatus.ACTIVE})
        return organization
    }
    static async deactivateOrganization(organizationId: string){
        const organization= await OrganizationRepository.updateOrganizationStatus(organizationId, AccountStatus.DEACTIVED)
        const organizationUser= await UserRepository.getOrganizationUsers(organizationId)

        // report event
        await ProducerFactory.organizationStatusEvent({organization, users: organizationUser, status:AccountStatus.ACTIVE})
        
        return organization
    }
}

export default OrganizationService
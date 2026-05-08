import { AccountStatus, UserCreatedBy } from "../../generated/prisma/enums";
import { OrganizationLinkedUserUncheckedUpdateInput, OrganizationLinkedUserUpdateInput } from "../../generated/prisma/models";
import { createUserEntity, UpdateUserRoleEntity } from "../lib/dtos/userDto";
import RoleHttp from "../lib/http/role";
import prisma from "../lib/prisma";
import { OrganizationUserId } from "../lib/type";

class UserRepository {
    static async getOrganizationUsers(organization_id: string){
        return prisma.user.findMany({
            where: {
                organization_links: {
                    some: {
                        organization_id
                    }
                }
            },
            include: {
                organization_links: {
                    select: {
                        status: true,
                        role_id: true,
                        role_name: true,
                        created_at: true,
                        updated_at: true,
                    },
                    where: {organization_id}
                }
            }
        })
    }

    static async createNewUser (createUserEntity: createUserEntity){
        const {email,first_name,last_name,organization_id,role_id}= createUserEntity
        const role= await RoleHttp.getRoleById(role_id)
        return prisma.user.create({
            data: {
                email, first_name,last_name,created_by_type: UserCreatedBy.ORGANIZATION,
                organization_links: {
                    create: {
                        organization_id,
                        role_id,
                        role_name: role.name
                    }
                },
            }
        })
    }

    static async createExistingUser(createUserEntity: createUserEntity){
        const {email,organization_id,role_id}= createUserEntity
        const role= await RoleHttp.getRoleById(role_id)
        return prisma.user.update({
            where: {email},
            data: {
                organization_links: {
                    create: {
                        organization_id,
                        role_id,
                        role_name: role.name
                    }
                },
            }
        })
    }
    static async getUserByEmail(email: string){
        return prisma.user.findFirst({
            where: {email}
        })
    }
    static async getUserById(id: string){
        return prisma.user.findFirst({
            where: {id}
        })
    }

    static async getOrganizationUser(id: OrganizationUserId){
        const {organization_id,user_id}= id
        return prisma.user.findFirst({
            where: {
                id: user_id,
                organization_links: {
                    some: {
                        organization_id
                    }
                }
            },
            include: {
                organization_links: {
                    select: {
                        role_id:true,
                        role_name: true,
                        status: true,
                        created_at: true,
                        updated_at: true,  
                    },
                    where: {organization_id}
                },
            }
        })
    }

    static async updateOrganizationUser(id: OrganizationUserId, data: OrganizationLinkedUserUncheckedUpdateInput){
        const {organization_id,user_id}= id

        return prisma.organizationLinkedUser.update({
            where: {
                organization_id_user_id: {
                    organization_id, user_id
                }
            },
            data
        })
    }

    static async deleteOrganizationUser(id: OrganizationUserId){
        const {organization_id,user_id}= id

        return prisma.organizationLinkedUser.delete({
            where: {
                organization_id_user_id: {
                    organization_id,
                    user_id
                }
            }
        })
    }

    static async deleteUser(user_id: string){
        return prisma.user.delete({
            where: {id: user_id}
        })
    }

    
}

export default UserRepository
import { OrganizationUserStatus, UserCreatedBy } from "../../generated/prisma/enums";
import { OrganizationLinkedUserUncheckedUpdateInput, OrganizationLinkedUserUpdateInput } from "../../generated/prisma/models";
import { createUserEntity, UpdateUserRoleEntity } from "../lib/dtos/userDto";
import prisma from "../lib/prisma";

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
                        role: true,
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
        return prisma.user.create({
            data: {
                email, first_name,last_name,created_by_type: UserCreatedBy.ORGANIZATION,
                organization_links: {
                    create: {
                        organization_id,
                        role_id,
                    }
                },
            }
        })
    }

    static async createUserExisting(createUserEntity: createUserEntity){
        const {email,organization_id,role_id}= createUserEntity

        return prisma.user.update({
            where: {email},
            data: {
                organization_links: {
                    create: {
                        organization_id,
                        role_id,
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

    static async getOrganizationUser(user_id: string, organization_id: string){
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
                        role: true,
                        status: true,
                        created_at: true,
                        updated_at: true,  
                    },
                    where: {organization_id}
                },
            }
        })
    }

    static async updateOrganizationUser(user_id: string, organization_id: string, data: OrganizationLinkedUserUncheckedUpdateInput){
        return prisma.organizationLinkedUser.update({
            where: {
                organization_id_user_id: {
                    organization_id, user_id
                }
            },
            data
        })
    }

    static async deleteOrganizationUser(user_id: string, organization_id: string){
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
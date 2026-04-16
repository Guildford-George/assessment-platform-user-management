import { AccountStatus } from "../../generated/prisma/enums";
import { OrganizationUpdateInput } from "../../generated/prisma/models";
import { CreateOrganizationDto, CreateOrganizationEntity } from "../lib/dtos/organizationDto";
import prisma from "../lib/prisma";

class OrganizationRepository{
    static async createOrganization(createOrganizationEntity: CreateOrganizationEntity){
        const {admin_email,name}= createOrganizationEntity
        return prisma.organization.create({
            data: {
                admin_email,name
            }
        })
    }
    static async getOrganizationList(name: string){
        return prisma.organization.findMany({
            where: {
                name: {
                    contains: name,
                    mode: "insensitive"
                }
            }
        })
    }
    static async getOrganization(organization_id: string){
        return prisma.organization.findFirst({
            where: {id: organization_id}
        })
    }

    static async updateOrganization(organization_id: string, data: OrganizationUpdateInput){
        return prisma.organization.update({
            where: {id: organization_id},
            data
        })
    }
    
    static async deleteOrganization(organization_id: string){
        return prisma.organization.delete({
            where: {id: organization_id}
        })
    }

    static async updateOrganizationStatus(organization_id: string, status: AccountStatus){
        return prisma.organization.update({
            where: {id: organization_id},
            data: {
                status,
                organization_linked_users: {
                    updateMany: {
                        where: {organization_id},
                        data: {status}
                    }
                }
            }
        })
    }
}

export default OrganizationRepository
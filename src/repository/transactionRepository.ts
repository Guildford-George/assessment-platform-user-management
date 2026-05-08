import { AccountStatus, UserCreatedBy } from "../../generated/prisma/enums";
import { CreateOrganizationEntity } from "../lib/dtos/organizationDto";
import prisma from "../lib/prisma";

class Transaction {
    static async createOrganizationWithUser(data: Omit<CreateOrganizationEntity, "user_id">){
        const {admin_email,name,role_id,role_name}= data
        return prisma.$transaction(async(tsx)=>{
            const user= await tsx.user.create({
                data: {
                    email: admin_email,
                    first_name: name,
                    created_by_type: UserCreatedBy.ORGANIZATION
                }
            })

            const organization= await tsx.organization.create({
                data: {
                    admin_email, 
                    name, 
                    status: AccountStatus.INACTIVE,
                    organization_linked_users: {
                        create: {
                            user_id: user.id,
                            role_id,
                            role_name
                        }
                    }
                }
            })

            return {
                organization,user
            }
        })
    }

}

export default Transaction
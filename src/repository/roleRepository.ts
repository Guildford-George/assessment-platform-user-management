import { RoleWhereInput } from "../../generated/prisma/models"
import { CreateRoleEntity, UpdateRoleEntity } from "../lib/dtos/roledto"
import prisma from "../lib/prisma"

class RoleRepository {
    static async getAvailableRoles(query: RoleWhereInput ){
        return prisma.role.findMany({
            where: query
        })
    }
    static async getRoleById(roleId: string){
        return prisma.role.findFirst({
            where: {
                id: roleId
            }
        })
    }

    static async createRole(createRoleEntity:CreateRoleEntity){
        const {name,is_system,organization_id,permissionsConnect}= createRoleEntity
        return prisma.role.create({
            data: {
                name,
                organization_id,
                is_system,
                permissions: {
                    connect: permissionsConnect
                }
            }
        })
    }

    static async updateRole(updateRoleEntity:UpdateRoleEntity){
        const {role_id, name, connect,disconnect}= updateRoleEntity
        return prisma.role.update({
            where: {
                id: role_id
            },
            data: {
                name: name,
                permissions: {
                    connect,
                    disconnect
                }
            }
        })
    }

} 

export default RoleRepository
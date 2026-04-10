import RoleQuery from "../lib/complexDbQuery/roleQuery"
import { CreateRoleDto, CreateRoleEntity, GetRolesDto, updateRoleDto, UpdateRoleEntity} from "../lib/dtos/roledto"
import Helpers from "../lib/helpers"
import RoleRepository from "../repository/roleRepository"
class RoleService {
    static async getRoles(organizationId: string, getRolesDto:GetRolesDto){
        const {isSystem,name,permissions}= getRolesDto
        const query= RoleQuery.getRolesQuery({
            organizationId,
            isSystem,
            name,
            permissions
        })
        const roles= await RoleRepository.getAvailableRoles(query)
        return roles
    }
    static async getRoleById(roleId: string){
        const role= await RoleRepository.getRoleById(roleId)
        return role
    }

    static async createRole(createRoleDto: CreateRoleDto){
        const isSystem= Helpers.checkIsSystem(createRoleDto.organizationId)
        const permissionsConnect= createRoleDto.permissions.map((permission)=>({id: permission}))
        const createRoleEntity: CreateRoleEntity= {
            name: createRoleDto.name,
            is_system: isSystem,
            organization_id: createRoleDto.organizationId,
            permissionsConnect
        }
        const  role= await RoleRepository.createRole(createRoleEntity)
        return role
    }

    static async updateRole(updateRoleDto:updateRoleDto){
        const deletedPermissions= updateRoleDto.deletedPermissions || []
        const disconnectPermissions= deletedPermissions.map((permission)=>({id: permission}))

        const newPermissions= updateRoleDto.newPermissions  || []
        const connectPermissions= newPermissions.map((permission)=>({id: permission}))
        const updateRoleEntity:UpdateRoleEntity= {
            role_id: updateRoleDto.roleId,
            name: updateRoleDto.name || undefined,
            disconnect: disconnectPermissions,
            connect: connectPermissions
        }
        const role= await RoleRepository.updateRole(updateRoleEntity)
        return role
    }

}

export default RoleService
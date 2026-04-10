import RoleQuery from "../lib/complexDbQuery/roleQuery"
import { CreateRoleDto, CreateRoleEntity, GetRolesDto, updateRoleDto, UpdateRoleEntity} from "../lib/dtos/roledto"
import Helpers from "../lib/helpers"
import RoleRepository from "../repository/roleRepository"
class RoleService {
    static async getRoles(organization_id: string, getRolesDto:GetRolesDto){
        const {is_system,name,permissions}= getRolesDto
        const query= RoleQuery.getRolesQuery({
            organization_id,
            is_system,
            name,
            permissions
        })
        const roles= await RoleRepository.getAvailableRoles(query)
        return roles
    }
    static async getRoleById(role_id: string){
        const role= await RoleRepository.getRoleById(role_id)
        return role
    }

    static async createRole(createRoleDto: CreateRoleDto){
        const isSystem= Helpers.checkIsSystem(createRoleDto.organization_id)
        const permissionsConnect= createRoleDto.permissions.map((permission)=>({id: permission}))
        const createRoleEntity: CreateRoleEntity= {
            name: createRoleDto.name,
            is_system: isSystem,
            organization_id: createRoleDto.organization_id,
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
            role_id: updateRoleDto.role_id,
            name: updateRoleDto.name || undefined,
            disconnect: disconnectPermissions,
            connect: connectPermissions
        }
        const role= await RoleRepository.updateRole(updateRoleEntity)
        return role
    }

}

export default RoleService
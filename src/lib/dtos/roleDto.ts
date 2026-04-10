export interface CreateRoleDto {
    name: string,
    organization_id: string
    permissions: string []
}

export interface GetRolesDto {
    name?: string
    permissions?: string[]
    is_system?:boolean
}

export interface CreateRoleEntity{
    name: string
    organization_id: string,
    is_system: boolean
    permissionsConnect: {id: string}[]
}

export interface UpdateRoleEntity{
    name?: string
    disconnect: {id: string}[]
    connect: {id: string}[]
    role_id: string
}

export type GetRolesByPermissionsDto ={
    permissions: string[],
    organization_id: string
}

export interface updateRoleDto{
    name: string,
    deletedPermissions: string[]
    newPermissions: string[]
    role_id: string
}

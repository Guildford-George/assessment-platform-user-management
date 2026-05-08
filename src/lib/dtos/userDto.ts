export interface createUserDto{
    firstName: string,
    lastName: string;
    email: string,
    roleId: string,
    roleName: string
    organizationId: string
}

export interface createUserEntity{
    first_name: string,
    last_name: string,
    email: string,
    role_id: string,
    role_name: string,
    organization_id: string
}

export interface UpdateUserRoleDto {
    roleId: string,
    roleName: string,
    organizationId: string,
    userId: string
}

export interface UpdateUserRoleEntity{
    role_id: string,
    organization_id: string,
    user_id: string
}

export interface OrganizationUserDto{
    userId: string
    organizationId: string
}
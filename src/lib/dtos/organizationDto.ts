export interface CreateOrganizationDto {
    name: string,
    email: string,
}
export interface CreateOrganizationEntity {
    name: string,
    admin_email: string,
    user_id: string,
    role_id: string,
    role_name: string
}
export interface UpdateOrganizationDto {
    name: string,
    logo: string,
}
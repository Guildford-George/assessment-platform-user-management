export interface CreateOrganizationDto {
    name: string,
    email: string,
}
export interface CreateOrganizationEntity {
    name: string,
    admin_email: string,
}
export interface UpdateOrganizationDto {
    name: string,
    logo: string,
}
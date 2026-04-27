import { JwtPayload } from "jsonwebtoken"
import { AccountStatus, Organization, User } from "../../generated/prisma/client"

export interface AuthUser {
    organizationId: string,
    userId: string,
    email: string
}

export interface JwtPayloadExt extends JwtPayload, AuthUser{}

export interface OrganizationUserEventPayload {
    user: User,
    organization: Organization,
    roleId: string
}

export interface NewOrganizationUserEventPublish { 
    user: User, 
    organizationId: string, 
    roleId: string 
}

export interface UpdateOrganizationUserEventPublish{
    userId: string,
    roleId: string,
    organizationId: string
}

export interface OrganizationuserStatusEventPublish {
    userId: string,
    organizationId: string
    status: AccountStatus
}

export interface OrganizationUserStatusEventPayload {
    user: User,
    organization: Organization,
    status: AccountStatus
}

export interface DeleteOrganizationUserEventPayload {
    user: User,
    organization: Organization
}

export interface DeleteOrganizationUserEventPublish {
    userId: string,
    organizationId: string
}

export interface DeleteUser{
    userId: string
}

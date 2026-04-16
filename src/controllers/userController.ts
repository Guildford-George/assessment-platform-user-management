import { Request, Response } from "express";
import UserService from "../services/userService";
import { AuthUser } from "../lib/type";
import { createUserDto, UpdateUserRoleDto } from "../lib/dtos/userDto";

class UserController {
    static async getOrganizationUsers(req: Request, res: Response){
        try {
            const user= req.user as AuthUser
            const organizationUsers=  await UserService.getOrganizationUsers(user.organizationId)
            res.status(200).json({
                success: true,
                data: { users: organizationUsers}
            })
        } catch (error) {
            
        }
    }

    static async createOrganizationUser(req: Request, res: Response){
        try {
            const {email, firstName, lastName, roleId} = req.body
            const authUser= req.user as AuthUser
            const createUserDto: createUserDto= {email, firstName, lastName, roleId, organizationId: authUser.organizationId} 

            const user= await UserService.createOrganizationUser(createUserDto)
            res.status(201).json({
                success: true,
                data: {user}
            })
        } catch (error) {
            
        }
    }
    static async getOrganizationUser(req: Request, res: Response){
        try {
            const authUser= req.user as AuthUser
            const params= req.params as {userId: string}

            const user= await UserService.getOrganizationUser(params.userId, authUser.organizationId)
            res.status(200).json({
                success: true,
                data: {user}
            })
        } catch (error) {
            
        }
    }

    static async updateOrganizationUserRole(req: Request, res: Response){
        try {
            const {organizationId}= req.user as AuthUser
            const {userId}= req.params as {userId: string}
            const roleId= req.body.roleId as string
            const updateUserRoleDto: UpdateUserRoleDto= {
                organizationId,
                roleId,
                userId
            }
            const user= await UserService.updateOrganizationUserRole(updateUserRoleDto)
            res.status(200).json({
                success: true,
                data: {
                    user
                }
            })
        } catch (error) {
            
        }
    }

    static async deactivateOrganizationUser(req: Request, res: Response){
        try {
            const {organizationId}= req.user as AuthUser
            const {userId}= req.params as {userId: string}

            const user= await UserService.deactiveOrganizationUser({organizationId, userId})
            res.status(200).json({
                succss: true,
                data: {
                    user
                }
            })
        } catch (error) {
            
        }
    }
    static async activeOrganizationUser(req: Request, res: Response){
        try {
            const {organizationId}= req.user as AuthUser
            const {userId}= req.params as {userId: string}

            const user= await UserService.activateOrganizationUser({organizationId, userId})
            res.status(200).json({
                succss: true,
                data: {
                    user
                }
            })
        } catch (error) {
            
        }
    }

    static async deleteOrganizationUser(req: Request, res: Response){
        try {
             const {organizationId}= req.user as AuthUser
            const {userId}= req.params as {userId: string}

            const user= await UserService.deactiveOrganizationUser({organizationId,userId})
            res.status(204)
        } catch (error) {
            
        }
    }

}

export default UserController
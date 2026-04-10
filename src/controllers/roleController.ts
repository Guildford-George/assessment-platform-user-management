import {Request,Response} from "express"
import RoleService from "../services/roleService"

import { CreateRoleDto, GetRolesByPermissionsDto, updateRoleDto} from "../lib/dtos/roledto"
import { AuthUser } from "../lib/type"

class RoleController{
    static async getRoles (req:Request, res: Response){
        try {
            const user= req.user as AuthUser
            const roles= await RoleService.getRoles(user.organizationId, req.query)
            res.status(200).json({
                success: true,
                data: {
                    roles
                }
            })
        } catch (error) {
            
        }
    }

    static async getRoleById(req: Request, res: Response){
        try {
            const {roleId}= req.params as {roleId: string}
            const role= await RoleService.getRoleById(roleId)
            res.status(200).json({
                sucess: true,
                data: {
                    role
                }
            })
        } catch (error) {
            
        }
    }

    static async createRole(req:Request, res: Response){
        try {
            const createRoleDto: CreateRoleDto= {
                name: req.body.name,
                organizationId: req.user?.organizationId as string,
                permissions:req.body.permissions
            }
            const role= await RoleService.createRole(createRoleDto)
            res.status(201).json({
                success: true,
                data: {
                    role
                }
            })
        } catch (error) {
            
        }
    }

    static async updateRole(req: Request, res:Response){
        try {
            const {roleId}= req.params as {roleId: string}
            const {name, deletedPermissions, newPermissions}= req.body
            const updateRoleDto:updateRoleDto={
                roleId,
                name,
                deletedPermissions,
                newPermissions
            }
            const role= RoleService.updateRole(updateRoleDto)
            res.status(200).json({
                success: true,
                data: {
                    role: role
                }
            })
        } catch (error) {
            
        }
    }

}

export default RoleController
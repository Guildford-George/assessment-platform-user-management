import {Request,Response} from "express"
import RoleService from "../services/roleService"
import {RequestExtend} from "../lib/type"
import { CreateRoleDto, GetRolesByPermissionsDto, updateRoleDto} from "../lib/dtos/roledto"

class RoleController{
    static async getRoles (req:RequestExtend, res: Response){
        try {
            const roles= await RoleService.getRoles(req.user.organization_id, req.query)
            return res.status(200).json({
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
            const {role_id}= req.params as {role_id: string}
            const role= await RoleService.getRoleById(role_id)
            res.status(200).json({
                sucess: true,
                data: {
                    role
                }
            })
        } catch (error) {
            
        }
    }

    static async createRole(req:RequestExtend, res: Response){
        try {
            const createRoleDto: CreateRoleDto= {
                name: req.body.name,
                organization_id: req.user.organization_id,
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

    static async updateRole(req: RequestExtend, res:Response){
        try {
            const {role_id}= req.params as {role_id: string}
            const {name, deletedPermissions, newPermissions}= req.body
            const updateRoleDto:updateRoleDto={
                role_id,
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
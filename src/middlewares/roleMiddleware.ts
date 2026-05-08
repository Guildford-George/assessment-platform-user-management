import { NextFunction, Request, Response } from "express";
import RoleHttp from "../lib/http/role";

class RoleMiddleware {
    static async roleAccess(req: Request, res: Response, next:NextFunction){
        try {
            const roleId: string= req.body.roleId || req.params.roleId

            const role= await RoleHttp.getRoleById(roleId)
            req.role= role
            next()
        } catch (error) {
            next(error)
        }
    }
}

export default RoleMiddleware
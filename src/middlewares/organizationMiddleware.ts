import { NextFunction, Request, Response } from "express";

class OrganizationMiddleware {
    static async organizationAccess(req:Request, res:Response, next:NextFunction){
        try {
            const systemId= process.env["SYSTEM_ID"]
            const {organizationId}= req.user!
            if(systemId===organizationId){
                return next()
            }
            const targetOrganizationId= req.params.organizationId
            // continue after adding error handling logic
            
        } catch (error) {
            next(error)
        }
    }
}
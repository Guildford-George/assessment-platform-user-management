import { NextFunction, Request, Response } from "express";
import { STATUS_CODES } from "http";
import AppToken from "../lib/appToken";
import { UnauthorizedException } from "../lib/exception/statusCodeExceptions";
import { AUTH_ERRORS } from "../lib/exception/errorMessage";


const authenticationToken= (req:Request, res: Response, next:NextFunction)=>{
    try {
        const {authorization}= req.headers

        const token = authorization?.split(" ")[1]
        if(!token){
            throw new UnauthorizedException({
                error: AUTH_ERRORS.UNAUTHORIZED
            })
        }
        req.user= AppToken.decode(token)
        
        next()
    } catch (error) {
        next(error)
    }
}

export default authenticationToken
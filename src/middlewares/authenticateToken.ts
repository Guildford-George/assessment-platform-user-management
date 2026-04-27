import { NextFunction, Request, Response } from "express";
import { STATUS_CODES } from "http";
import AppToken from "../lib/appToken";


const authenticationToken= (req:Request, res: Response, next:NextFunction)=>{
    try {
        const {authorization}= req.headers

        const token = authorization?.split(" ")[1]
        if(!token){
            return res.status(401).json({
                success: true,
                data: {
                    message: "You are not authorized"
                }
            })

        }
        req.user= AppToken.decode(token)
        
        next()
    } catch (error) {
        next(error)
    }
}

export default authenticationToken
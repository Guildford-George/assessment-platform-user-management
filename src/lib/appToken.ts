import jwt from "jsonwebtoken";
import { AuthUser, JwtPayloadExt } from "./type";
import { InternalServerErrorException, UnauthorizedException } from "./exception/statusCodeExceptions";
import { AUTH_ERRORS } from "./exception/errorMessage";

class AppToken {
    static decode (token: string){
        try {
            const secret= process.env["ACCESSTOKEN_SECRET"] as string
            const verifiedToken= jwt.verify(token,secret)  as JwtPayloadExt
            const {organizationId,email,userId}= verifiedToken
            const authUser:AuthUser= {
                organizationId,email,userId
            }
            return authUser
        } catch (error) {
            if(error instanceof jwt.JsonWebTokenError){
                throw new UnauthorizedException({
                    error: AUTH_ERRORS.INVALID_CREDENTIALS
                })
            }
            if(error instanceof jwt.TokenExpiredError){
                throw new UnauthorizedException({
                    error: AUTH_ERRORS.TOKEN_EXPIRED
                })
            }

            throw error
        }
    }

    static generateSystemRequestToken(){
        // continue
        return jwt.sign({user:"system"},process.env['SYSTEM_ACCESSTOKEN_SECRET']!)
    }

    static generateAccessToken(){
        return jwt.sign({user:"system"},process.env['ACCESSTOKEN_SECRET']!)
    }
}

export default AppToken
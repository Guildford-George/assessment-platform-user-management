import jwt from "jsonwebtoken";
import { AuthUser, JwtPayloadExt } from "./type";

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
                // update after implementing errorhandlers
            }
            else if(error instanceof jwt.TokenExpiredError){
                // update after implementing errorhandlers

            }

            // update after implementing errorhandlers
            throw new Error("Error")
        }
    }
}

export default AppToken
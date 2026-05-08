import sugeragent from "superagent"
import AppToken from "../appToken";
import { GetDefaultRoleHttpReponse } from "../type";
class RoleHttp {
    static async getDefaultRoleByRoleName(roleName: string) {
        const accessToken= AppToken.generateSystemRequestToken()
        const url = `${process.env['AUTH_SERVICE_BASEURL']}/role/default/${roleName}`
        const response= await sugeragent
        .get(url)
        .set('Authorization', `Bearer ${accessToken}`)
        .set('Accept', 'application/json');

        const body= response.body as GetDefaultRoleHttpReponse
        return body.data.role
    }

    static async getRoleById(roleId: string){
        const accessToken= AppToken.generateAccessToken()
        const url = `${process.env['AUTH_SERVICE_BASEURL']}/role/${roleId}`
        const response= await sugeragent
        .get(url)
        .set('Authorization', `Bearer ${accessToken}`)
        .set('Accept', 'application/json');

        const body= response.body as GetDefaultRoleHttpReponse
        return body.data.role
    }
}

export default RoleHttp
import { PermissionListRelationFilter, RoleWhereInput } from "../../../generated/prisma/models";
import { GetRolesDto } from "../dtos/roledto";

class RoleQuery{
    static getRolesQuery(params:GetRolesDto & {organization_id: string}): RoleWhereInput{

        
        const permissionsWhereClause: PermissionListRelationFilter | undefined= params.permissions && ({
            every: {
                AND: params.permissions.map((permission)=>({id:permission}))
            }
        })

        const nameWhereClause= params.name && ({
                startsWith: params.name
        })

        let isSystemBackedWhereClause: RoleWhereInput[] | undefined=  undefined
        if(params.is_system===true){
            isSystemBackedWhereClause= [{is_system: params.is_system}]
        }
        else if(params.is_system===false){
            isSystemBackedWhereClause= [{is_system: params.is_system, organization_id: params.organization_id}]
        }

        // when is_system is not provided
        else{
            isSystemBackedWhereClause= [{is_system: true}, {organization_id:params.organization_id}]
        }
        return  {
            name: nameWhereClause,
            permissions: permissionsWhereClause,
            OR: isSystemBackedWhereClause
        }
    }
}

export default RoleQuery
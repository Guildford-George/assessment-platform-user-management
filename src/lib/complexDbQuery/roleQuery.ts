import { PermissionListRelationFilter, RoleWhereInput, StringFilter } from "../../../generated/prisma/models";
import { GetRolesDto } from "../dtos/roledto";

class RoleQuery{
    static getRolesQuery(params:GetRolesDto & {organizationId: string}): RoleWhereInput{

        
        const permissionsWhereClause: PermissionListRelationFilter | undefined= params.permissions && ({
            every: {
                AND: params.permissions.map((permission)=>({id:permission}))
            }
        })

        const nameWhereClause= params.name && (<StringFilter<"Role">>{
                contains: params.name,
                mode: "insensitive",
        })

        let isSystemBackedWhereClause: RoleWhereInput[] | undefined=  undefined
        if(params.isSystem===true){
            isSystemBackedWhereClause= [{is_system: params.isSystem}]
        }
        else if(params.isSystem===false){
            isSystemBackedWhereClause= [{is_system: params.isSystem, organization_id: params.organizationId}]
        }

        // when is_system is not provided
        else{
            isSystemBackedWhereClause= [{is_system: true}, {organization_id:params.organizationId}]
        }
        return  {
            name: nameWhereClause,
            permissions: permissionsWhereClause,
            OR: isSystemBackedWhereClause
        }
    }
}

export default RoleQuery
import {Router} from "express"
import RoleController from "../controllers/roleController"

const roleRouter= Router({caseSensitive: true})

roleRouter.get("/", RoleController.getRoles)
roleRouter.post("/", RoleController.createRole)
roleRouter.get("/:roleId", RoleController.getRoleById)
roleRouter.put("/:roleId", RoleController.updateRole)
export default roleRouter
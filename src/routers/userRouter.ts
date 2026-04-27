import express from "express"
import UserController from "../controllers/userController"
import authenticationToken from "../middlewares/authenticateToken"
import UserMiddleware from "../middlewares/userMiddleware"

const userRouter= express.Router()

userRouter.use(authenticationToken)
userRouter.get('', UserController.getOrganizationUsers)
userRouter.post('', UserController.createOrganizationUser)
userRouter.get(':userId', UserController.getOrganizationUser)
userRouter.delete(':userId', UserMiddleware.organizationUserAccess,UserController.deleteOrganizationUser)
userRouter.put(':userId/role',UserMiddleware.organizationUserAccess, UserController.updateOrganizationUserRole)
userRouter.put(':userId/activate',UserMiddleware.organizationUserAccess, UserController.activeOrganizationUser)
userRouter.put(':userId/deactivate',UserMiddleware.organizationUserAccess, UserController.deactivateOrganizationUser)


export default userRouter
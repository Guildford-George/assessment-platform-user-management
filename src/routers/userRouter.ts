import express from "express"
import UserController from "../controllers/userController"

const userRouter= express.Router()

userRouter.get('', UserController.getOrganizationUsers)
userRouter.post('', UserController.createOrganizationUser)
userRouter.get(':userId', UserController.getOrganizationUser)
userRouter.delete(':userId', UserController.deleteOrganizationUser)
userRouter.put(':userId/role', UserController.updateOrganizationUserRole)
userRouter.put(':userId/activate', UserController.activeOrganizationUser)


export default userRouter
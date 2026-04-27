import { NextFunction, Request, Response } from "express";
import UserRepository from "../repository/userRepository";

class UserMiddleware {
  static async organizationUserAccess(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { userId } = req.params as { userId: string };
      const { organizationId } = req.user!;
      const user = UserRepository.getOrganizationUser({
        user_id: userId,
        organization_id: organizationId,
      });
      if (!user) {
        // update after implementing errorhandlers
      }
      next();
    } catch (error) {
      next(error);
    }
  }
}

export default UserMiddleware;

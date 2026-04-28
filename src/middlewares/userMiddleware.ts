import { NextFunction, Request, Response } from "express";
import UserRepository from "../repository/userRepository";
import { NotFoundException } from "../lib/exception/statusCodeExceptions";
import { USER_ERRORS } from "../lib/exception/errorMessage";

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
        throw new NotFoundException({
          error: USER_ERRORS.NOT_FOUND
        })
      }
      // Update when permission is implemented
      next();
    } catch (error) {
      next(error);
    }
  }
}

export default UserMiddleware;

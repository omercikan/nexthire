import { NextFunction, Request, Response } from "express";
import { User } from "../../../shared/models/User";

class UserController {
  async getUser(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await User.findById(req.user?.id).select("-password");

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json(user);
    } catch (error) {
      next(error);
    }
  }
}

const { getUser } = new UserController();
export { getUser };

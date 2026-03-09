import { NextFunction, Request, Response } from "express";
import { User } from "../../../shared/models/User";
import { getUserCache, setUserCache } from "../../../shared/services/cacheUser";

class UserController {
  async getUser(req: Request, res: Response, next: NextFunction) {
    const userId = req.user?.id;

    if (!userId) return;

    try {
      const cachedUser = await getUserCache(userId);

      if (cachedUser) return res.json(cachedUser);

      const user = await User.findById(userId).select("-password");

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      await setUserCache(userId, user);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
}

const { getUser } = new UserController();
export { getUser };

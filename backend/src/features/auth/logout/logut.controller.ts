import { NextFunction, Request, Response } from "express";
import { cookieSetter } from "../../../shared/utils/cookieSetter";
import { deleteUserCache } from "../../../shared/services/cacheUser";

class Logout {
  async accountLogout(req: Request, res: Response, next: NextFunction) {
    try {
      const cookies = req.cookies;
      const tokens = ["ajt", "rjt", "auth_provider"];
      const userId = req.headers["x-user-id"];

      if (!cookies["auth_provider"]) {
        return res.json({ provider: "Google" });
      }

      const validTokens = tokens.every((t) => cookies[t]);

      if (!validTokens) {
        return res.status(400).json({ message: "Logout failed" });
      }

      tokens.forEach((token) => {
        cookieSetter(res, token, "", { httpOnly: true, maxAge: 0, path: "/" });
      });

      await deleteUserCache(String(userId));
      return res.status(200).json({ message: "Logout successful" });
    } catch (error) {
      next(error);
    }
  }
}

export const LogoutController = new Logout();

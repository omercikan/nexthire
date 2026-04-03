import { NextFunction, Request, Response } from "express";
import { cookieSetter } from "../../../shared/utils/cookieSetter";
import { deleteUserCache } from "../../../shared/services/cacheUser";
import { RefreshToken } from "../../../shared/models/RefreshToken";

const COOKIE_NAMES = ["ajt", "rjt", "auth_provider"] as const;

class Logout {
  async accountLogout(req: Request, res: Response, next: NextFunction) {
    try {
      const cookies = req.cookies;
      const userId = req.user?.id;

      if (!cookies["auth_provider"]) {
        return res.json({ provider: "Google" });
      }

      const validTokens = COOKIE_NAMES.every((t) => cookies[t]);

      if (!validTokens) {
        return res.status(400).json({ message: "Logout failed" });
      }

      COOKIE_NAMES.forEach((token) => {
        cookieSetter(res, token, "", { httpOnly: true, maxAge: 0, path: "/" });
      });

      await Promise.all([
        deleteUserCache(String(userId)),
        RefreshToken.deleteOne({ userId }),
      ]);
      return res.status(200).json({ message: "Logout successful" });
    } catch (error) {
      next(error);
    }
  }
}

export const LogoutController = new Logout();

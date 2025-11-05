import { NextFunction, Request, Response } from "express";
import { JsonWebTokenError } from "jsonwebtoken";
import { authService } from "../services/authService";
import { RefreshToken } from "../models/RefreshToken";
import verifyToken from "../utils/verifyToken";
import controlRefreshToken from "../utils/controlRefreshToken";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = req.cookies["ajt"];

  if (!accessToken) {
    return next(new Error("Token missing", { cause: 401 }));
  }

  try {
    const {
      payload: { userId, role },
    } = verifyToken(accessToken);
    req.user = { id: userId, role };

    return next();
  } catch (error) {
    const jwtError = error as JsonWebTokenError;

    const payload = controlRefreshToken(jwtError, req.cookies["rjt"]);
    if (payload) {
      const { userId, role } = payload;
      req.user = { id: userId, role };

      try {
        const { refreshToken } = authService(res, userId, role);

        await RefreshToken.findOneAndUpdate(
          { userId },
          { token: refreshToken },
          { new: true, upsert: true }
        );

        return next();
      } catch (refreshError) {
        return next(new Error("Refresh token process failed", { cause: 401 }));
      }
    }
    return next(new Error(jwtError.message, { cause: 401 }));
  }
};

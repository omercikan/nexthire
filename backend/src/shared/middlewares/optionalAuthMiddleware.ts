import { Request, Response, NextFunction } from "express";
import verifyToken from "../utils/verifyToken";
import { JsonWebTokenError } from "jsonwebtoken";
import controlRefreshToken from "../utils/controlRefreshToken";
import { authService } from "../services/authService";
import { RefreshToken } from "../models/RefreshToken";

export const optionalAuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const accessToken = req.cookies["ajt"];

  if (!accessToken) return next();

  try {
    const {
      payload: { userId, role },
    } = verifyToken(accessToken);

    req.user = { id: userId, role };
    next();
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
          { new: true, upsert: true },
        );

        return next();
      } catch (refreshError) {
        return next();
      }
    }
    return next();
  }
};

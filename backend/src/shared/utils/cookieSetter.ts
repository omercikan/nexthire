import { CookieOptions, Response } from "express";
import config from "../../config/index";

export const cookieSetter = (
  res: Response,
  name: string,
  value: string,
  options: CookieOptions
) => {
  res.cookie(name, value, {
    sameSite: "strict",
    secure: config.nodeEnv === "production",
    ...options,
  });
};

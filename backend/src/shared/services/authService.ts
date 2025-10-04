import { Response } from "express";
import { cookieSetter } from "../utils/cookieSetter.ts";
import { generateToken } from "../utils/generateToken.ts";
import { Role } from "../types/user/role.ts";

export const authService = (res: Response, id: string, role: Role) => {
  const refreshToken = generateToken(
    { userId: id, role: role },
    { expiresIn: "7d" }
  );

  const accessToken = generateToken({ userId: id, role }, { expiresIn: "15m" });

  cookieSetter(res, "rjt", refreshToken, { httpOnly: true });
  cookieSetter(res, "ajt", accessToken, { httpOnly: true });

  return { refreshToken };
};

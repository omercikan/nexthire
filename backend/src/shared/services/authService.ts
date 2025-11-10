import { Response } from "express";
import { cookieSetter } from "../utils/cookieSetter";
import { generateToken } from "../utils/generateToken";
import { Role } from "../types/user/role";
import { sign } from "jsonwebtoken";
import config from "../../config";

export const authService = (res: Response, id: string, role: Role) => {
  const refreshToken = generateToken(
    { userId: id, role: role },
    { expiresIn: "7d" }
  );

  const accessToken = generateToken({ userId: id, role }, { expiresIn: "15m" });

  const provider = sign({ provider: "Form" }, config.jwt_secret);

  cookieSetter(res, "rjt", refreshToken, { httpOnly: true });
  cookieSetter(res, "ajt", accessToken, { httpOnly: true });
  cookieSetter(res, "auth_provider", provider, { httpOnly: true });

  return { refreshToken };
};

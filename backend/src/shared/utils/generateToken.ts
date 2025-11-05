import jwt, { SignOptions } from "jsonwebtoken";
import config from "../../config/index";

export const generateToken = (
  payload: {
    userId: string;
    role: "candidate" | "employer";
  },
  options?: SignOptions
) => {
  const token = jwt.sign({ payload }, config.jwt_secret, options);
  return token;
};

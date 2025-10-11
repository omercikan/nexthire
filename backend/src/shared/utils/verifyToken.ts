import jwt from "jsonwebtoken";
import config from "../../config/index.ts";
import { Role } from "../types/user/role.ts";

type Payload = {
  userId: string;
  role: Role;
};

/**
 * Checks a JWT and gives back the payload.
 *
 * @param {string} token - The JWT to check.
 * @returns {{ payload: { userId: string; role: Role } }} - The payload with userId and role.
 * @throws {JsonWebTokenError} - If the token is invalid or expired.
 */

const verifyToken = (token: string): { payload: Payload } => {
  const verifyToken = jwt.verify(token, config.jwt_secret) as {
    payload: Payload;
  };

  return verifyToken;
};

export default verifyToken;

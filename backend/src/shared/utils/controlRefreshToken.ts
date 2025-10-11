import { JsonWebTokenError } from "jsonwebtoken";
import verifyToken from "./verifyToken.ts";

/**
 * If the access token expired, grab the payload from the refresh token (from cookies).
 *
 * @param {JsonWebTokenError} jwtError - The error thrown when checking the access token.
 * @param {string} refreshToken - Refresh token from cookies.
 * @returns {object | undefined} - Returns payload if refresh token is valid, else undefined.
 */

const controlRefreshToken = (
  jwtError: JsonWebTokenError,
  refreshToken: string
) => {
  if (jwtError.message === "jwt expired") {
    const { payload } = verifyToken(refreshToken);
    return payload;
  }
};

export default controlRefreshToken;

import crypto from "crypto";
import bcrypt from "bcrypt";

export const generateOtpCode = async () => {
  const token = crypto.randomBytes(10).toString("hex");
  const code = crypto.randomInt(1_000_000).toString().padStart(6, "0");
  const hashedCode = await bcrypt.hash(String(code), 8);
  const expiration = Date.now() + 5 * 60 * 1000;

  return { token, code, hashedCode, expiration };
};

import bcrypt from "bcrypt";
import { User } from "../../../shared/models/User.ts";

export const updateUserPassword = async (
  userId: string,
  oldPassword: string,
  newPassword: string,
  hashedNewPassword: string
) => {
  try {
    const user = await User.findById(userId);

    if (!user) {
      return { message: "User not found.", status: 404 };
    }

    const now = Date.now();
    const failedTime = user.failedTime;
    const failedAttempts = user.failedAttempts;

    if (failedAttempts === 5 && now < failedTime) {
      const remainingMs = failedTime - Date.now();
      const remainingMinutes = Math.round(remainingMs / 1000 / 60);
      const remainingSeconds = Math.round(remainingMs / 1000);

      return {
        message: `Birden fazla hatalı giriş denemesi tespit edildi. Hesabınızın güvenliği için işlem geçici olarak durduruldu. Lütfen ${remainingMinutes === 0 ? `${remainingSeconds} saniye` : `${remainingMinutes} dakika`} sonra tekrar deneyin.`,
        status: 429,
      };
    }

    if (failedAttempts === 5 && now > failedTime) {
      user.failedAttempts = 0;
      user.failedTime = 0;
      await user?.save();
    }

    const comparePassword = await bcrypt.compare(
      oldPassword,
      String(user.password)
    );

    if (!comparePassword && user.failedAttempts !== 5) {
      user.failedAttempts += 1;
      user.failedTime = Date.now() + 15 * 60 * 1000;
      await user.save();
    }

    if (comparePassword && oldPassword === newPassword) {
      return {
        message: "New password must not be the same as the old password.",
        status: 400,
      };
    }

    if (comparePassword) {
      user.password = hashedNewPassword;
      user.failedAttempts = 0;
      user.failedTime = 0;
      await user?.save();

      return {
        message: "Password is updated successfully.",
        status: 200,
      };
    } else {
      return { message: "Passwords do not match.", status: 400 };
    }
  } catch (error) {
    return { message: "Internal server error.", status: 500 };
  }
};

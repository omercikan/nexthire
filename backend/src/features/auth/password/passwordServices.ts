import { Model, ObjectId } from "mongoose";
import bcrypt from "bcrypt";

export const updateUserPassword = async <
  T extends { password: string; failedAttempts: number; failedTime: number },
>(
  Model: Model<T>,
  userId: ObjectId,
  oldPassword: string,
  newPassword: string,
  hashedNewPassword: string
) => {
  try {
    const user = await Model.findById(userId);

    if (!user) {
      return { message: "User not found.", status: 404 };
    }

    const now = Date.now();

    if (user.failedAttempts === 5 && now < user.failedTime) {
      const remainingMs = user.failedTime - Date.now();
      const remainingMinutes = Math.round(remainingMs / 1000 / 60);
      const remainingSeconds = Math.round(remainingMs / 1000);

      return {
        message: `Birden fazla hatalı giriş denemesi tespit edildi. Hesabınızın güvenliği için işlem geçici olarak durduruldu. Lütfen ${remainingMinutes === 0 ? `${remainingSeconds} saniye` : `${remainingMinutes} dakika`} sonra tekrar deneyin.`,
        status: 429,
      };
    }

    if (user.failedAttempts === 5 && now > user.failedTime) {
      user.failedAttempts = 0;
      user.failedTime = 0;
      await user?.save();
    }

    const comparePassword = await bcrypt.compare(oldPassword, user.password);

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

import { NextFunction, Request, Response } from "express";
import { Otp } from "../../../shared/models/Otp.ts";
import bcrpyt from "bcrypt";
import config from "../../../config/index.ts";
import { Employer } from "../../../shared/models/Employer.ts";
import { Candidate } from "../../../shared/models/Candidate.ts";
import { updateUserPassword } from "./passwordServices.ts";
import { Document } from "mongoose";
import { Role } from "../../../shared/types/user/role.ts";

export const passwordController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token, userId, role, oldPassword, newPassword } = req.body;
  const hashedNewPassword = await bcrpyt.hash(newPassword, config.saltRounds);

  try {
    if (token) {
      const otp = await Otp.findOne({ token }).populate<{
        userId: Document & { password: string; role: Role };
      }>("userId");

      if (!otp) {
        return res.status(404).json({ message: "OTP not found" });
      }

      otp.userId.password = hashedNewPassword;
      await otp.userId.save();
      await Otp.findByIdAndDelete(otp._id);

      return res.json({
        message: "Password is updated successfully.",
        role: otp.userId.role,
      });
    } else {
      switch (role) {
        case "employer":
          const employerResponse = await updateUserPassword(
            Employer,
            userId,
            oldPassword,
            newPassword,
            hashedNewPassword
          );

          res.status(employerResponse.status).json(employerResponse);
          break;
        case "candidate":
          const candidateResponse = await updateUserPassword(
            Candidate,
            userId,
            oldPassword,
            newPassword,
            hashedNewPassword
          );

          res.status(candidateResponse.status).json(candidateResponse);
          break;
        default:
          return res.status(400).json({ message: "Role is not valid." });
      }
    }
  } catch (error) {
    next(error);
  }
};

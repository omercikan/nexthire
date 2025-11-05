import { NextFunction, Request, Response } from "express";
import { Otp } from "../../../shared/models/Otp";
import bcrypt from "bcrypt";
import { publisher } from "../../../queues/publisher";
import { EmployerTypes } from "../../../shared/types/user/employerUser.types";
import { CandidateTypes } from "../../../shared/types/user/candidateUser.types";
import { generateOtpCode } from "../../../shared/utils/generateOtpCode";

export class OtpController {
  verifyOtp = async (req: Request, res: Response, next: NextFunction) => {
    const { token, code } = req.body;

    if (!token || !code) {
      return res
        .status(400)
        .json({ message: "Token or code missing", status: false });
    }

    try {
      const findOtp = await Otp.findOne({ token }).select("-__v");

      if (!findOtp) {
        return res
          .status(404)
          .json({ message: "OTP not found", status: false });
      }

      if (Date.now() > findOtp.expiration) {
        return res.status(400).json({ message: "OTP expired", status: false });
      }

      const isValidCode = await bcrypt.compare(code, String(findOtp?.code));
      if (!isValidCode) {
        return res.status(400).json({
          message: "OTP code mismatch",
          status: false,
        });
      }

      res.json({ message: "OTP verified successfully", status: true });
    } catch (error) {
      next(error);
    }
  };

  refreshOtp = async (req: Request, res: Response, next: NextFunction) => {
    const { token } = req.body;

    try {
      const {
        token: newToken,
        code,
        expiration,
        hashedCode,
      } = await generateOtpCode();

      const otp = await Otp.findOneAndUpdate(
        { token },
        { expiration, code: hashedCode, token: newToken },
        { new: true }
      ).populate<{ userId: CandidateTypes | EmployerTypes }>("userId");

      if (!otp) {
        return res
          .status(404)
          .json({ message: "OTP not found", status: false });
      }

      await publisher("emailQueue", {
        code,
        description:
          "NextHire hesabınızı etkinleştirmek için aşağıdaki doğrulama kodunu kullanın. Bu kod yalnızca kısa süreli geçerlidir.",
        token: newToken,
        email: otp.userId.email,
        fullname: otp.userId.fullname,
      });

      res.json({
        message: "A new verification code has been sent to your email.",
        status: true,
        email: otp.userId.email,
      });
    } catch (error) {
      next(error);
    }
  };
}

const { verifyOtp, refreshOtp } = new OtpController();

export { verifyOtp, refreshOtp };

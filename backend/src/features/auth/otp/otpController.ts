import { NextFunction, Request, Response } from "express";
import { Otp } from "../../../shared/models/Otp.ts";
import bcrypt from "bcrypt";

export const otpController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token, code } = req.body;

  if (!token || !code) {
    return res
      .status(400)
      .json({ message: "Token or code missing", status: false });
  }

  try {
    const findOtp = await Otp.findOne({ token }).select("-__v");

    if (!findOtp) {
      return res.status(404).json({ message: "OTP not found", status: false });
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

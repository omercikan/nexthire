import { NextFunction, Request, Response } from "express";
import { Employer } from "../../../../shared/models/Employer.ts";
import { createUser } from "../../../../shared/services/createUserService.ts";
import { publisher } from "../../../../queues/publisher.ts";
import { Otp } from "../../../../shared/models/Otp.ts";
import mongoose from "mongoose";
import { generateOtpCode } from "../../../../shared/utils/generateOtpCode.ts";

class EmployerController {
  async createEmployer(req: Request, res: Response, next: NextFunction) {
    const body = req.body;
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const existingUser = await Employer.findOne({
        email: body.email,
      }).session(session);

      if (existingUser) {
        await session.abortTransaction();
        return res
          .status(400)
          .json({ message: "This email address is already in use." });
      }

      const createdEmployer = await createUser("employer", body, session);

      if (createdEmployer) {
        const { token, code, expiration, hashedCode } = await generateOtpCode();

        const createdOtp = new Otp({
          userId: createdEmployer._id,
          userModel: "Employer",
          token,
          expiration,
          code: hashedCode,
        });
        await createdOtp.save({ session });

        await publisher("emailQueue", {
          code,
          token,
          email: createdEmployer.email,
          fullname: createdEmployer.fullname,
        });

        await session.commitTransaction();
        res.status(201).json(createdEmployer);
      }
    } catch (error) {
      await session.abortTransaction();
      next(error);
    } finally {
      session.endSession();
    }
  }
}

const { createEmployer } = new EmployerController();

export { createEmployer };

import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { EmailServices } from "./emails.service.ts";

class EmailsController {
  sendOtp = async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;
    const session = await mongoose.startSession();
    session.startTransaction();

    const { findUser, deleteOldOtps, createOtp, sendEmail } = new EmailServices(
      session,
      email
    );

    try {
      const user = await findUser();

      if (user) {
        await deleteOldOtps(user._id);
        await createOtp(user.role, user._id);
        const email = await sendEmail(user.fullname);

        res.json(email);
      }
    } catch (error) {
      await session.abortTransaction();
      return next(error);
    } finally {
      await session.endSession();
    }
  };
}

export const emailsController = new EmailsController();

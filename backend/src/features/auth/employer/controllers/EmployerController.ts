import { NextFunction, Request, Response } from "express";
import { createUser } from "../../../../shared/services/createUserService";
import { publisher } from "../../../../queues/publisher";
import { Otp } from "../../../../shared/models/Otp";
import mongoose from "mongoose";
import { generateOtpCode } from "../../../../shared/utils/generateOtpCode";
import { User } from "../../../../shared/models/User";
import bcrypt from "bcrypt";
import { authService } from "../../../../shared/services/authService";
import { setUserCache } from "../../../../shared/services/cacheUser";

class EmployerController {
  async createEmployer(req: Request, res: Response, next: NextFunction) {
    const body = req.body;
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const existingUser = await User.findOne({
        email: body.email,
      }).session(session);

      if (existingUser) {
        await session.abortTransaction();
        return res
          .status(400)
          .json({ message: "This email address is already in use." });
      }

      const createdEmployer = await createUser(
        { ...body, role: "employer" },
        session
      );

      if (createdEmployer) {
        const { token, code, expiration, hashedCode } = await generateOtpCode();

        const createdOtp = new Otp({
          userId: createdEmployer._id,
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

  async loginEmployer(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({ message: "Email or Password invalid" });
      }

      const comparePassword = await bcrypt.compare(
        password,
        String(user.password)
      );

      if (!comparePassword) {
        return res.status(400).json({ message: "Email or Password invalid" });
      }

      const token = authService(res, user.id, "employer");

      if (token) {
        await setUserCache(user.id, user);
        return res.json({ message: "Login successful" });
      }
    } catch (error) {
      next(error);
    }
  }
}

const { createEmployer, loginEmployer } = new EmployerController();

export { createEmployer, loginEmployer };

import { NextFunction, Request, Response } from "express";
import { Employer } from "../../../../shared/models/Employer.ts";
import { createUser } from "../../../../shared/services/createUserService.ts";
import { authService } from "../../../../shared/services/authService.ts";
import { RefreshToken } from "../../../../shared/models/RefreshToken.ts";
import { publisher } from "../../../../queues/publisher.ts";

class EmployerController {
  async createEmployer(req: Request, res: Response, next: NextFunction) {
    const body = req.body;
    const session = await Employer.startSession();
    session.startTransaction();

    try {
      const existingUser = await Employer.findOne({
        email: body.email,
      }).session(session);

      if (existingUser) {
        await session.abortTransaction();
        return res
          .status(400)
          .json({ message: "This email adress is already in use" });
      }

      const createdEmployer = await createUser("employer", body, session);

      await publisher("emailQueue", {
        userId: createdEmployer._id,
        email: createdEmployer.email,
        fullname: createdEmployer.fullname,
      });

      const { refreshToken } = authService(
        res,
        String(createdEmployer._id),
        "employer"
      );

      const createdRefresh = new RefreshToken({
        userId: createdEmployer._id,
        token: refreshToken,
      });
      await createdRefresh.save({ session });

      await session.commitTransaction();
      res.status(201).json({ createdEmployer, createdRefresh });
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

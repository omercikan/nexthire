// express Request, Response imports
import { NextFunction, Request, Response } from "express";

// bcrypt
import bcrypt from "bcrypt";

// config import
import config from "../../../../config/index.ts";

// RefreshToken and Candidate models
import { Candidate } from "../../../../shared/models/Candidate.ts";
import { RefreshToken } from "../../../../shared/models/RefreshToken.ts";

// create user, auth services
import { createUser } from "../../../../shared/services/createUserService.ts";
import { authService } from "../../../../shared/services/authService.ts";

// candidate user interface
import { CandidateTypes } from "../../../../shared/types/user/candidateUser.types.ts";

class CandidateController {
  async createCandidate(req: Request, res: Response, next: NextFunction) {
    const { fullname, email, password } = req.body;

    const session = await Candidate.startSession();
    session.startTransaction();

    try {
      const user = await Candidate.findOne({ email });

      if (user) {
        throw new Error("This email address is already in use.", {
          cause: 400,
        });
      }

      const hashedPassword = await bcrypt.hash(password, config.saltRounds);

      const createdUser = await createUser<Partial<CandidateTypes>>(
        "candidate",
        {
          fullname,
          email,
          password: hashedPassword,
        }
      );

      if (createdUser) {
        const { _id, role } = createdUser;

        const { refreshToken } = authService(res, _id, role);

        const hashedRefreshToken = await bcrypt.hash(
          refreshToken,
          config.saltRounds
        );
        await RefreshToken.create({ token: hashedRefreshToken, userId: _id });

        await session.commitTransaction();
        session.endSession();

        return res
          .status(201)
          .json({ message: "Account is successfully created." });
      }
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      next(error);
    }
  }
}

export const createCandidateController = new CandidateController()
  .createCandidate;

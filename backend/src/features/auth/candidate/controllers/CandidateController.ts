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

  async loginCandidate(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;

    try {
      const user = await Candidate.findOne({ email });

      if (!user || !(await bcrypt.compare(password, user.password ?? ""))) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      const { refreshToken } = authService(res, user._id, "candidate");
      const hashedRefreshToken = await bcrypt.hash(
        refreshToken,
        config.saltRounds
      );

      await RefreshToken.findOneAndUpdate(
        { userId: user._id },
        { token: hashedRefreshToken },
        { new: true, upsert: true }
      );

      const { password: _, ...safeUser } = user.toObject();

      req.user = { id: user._id, role: user.role };

      res.json({
        message: "Login successful",
        user: safeUser,
      });
    } catch (error) {
      next(error);
    }
  }

  async googleAuth(req: Request, res: Response, next: NextFunction) {
    const body = req.body;

    try {
      const user = await Candidate.findOne({ email: body.email });

      if (!user) {
        const newUser = await createUser("candidate", body);

        if (newUser) req.user = { id: newUser?._id, role: newUser?.role };

        return res
          .status(200)
          .json({ message: "Google registration successful", user: newUser });
      } else {
        req.user = { id: user._id, role: user.role };

        return res.status(200).json({
          message: "The user already exists",
          user: user,
        });
      }
    } catch (error) {
      next(error);
    }
  }
}

const { loginCandidate, createCandidate, googleAuth } =
  new CandidateController();
export { loginCandidate, createCandidate, googleAuth };

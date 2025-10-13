import { NextFunction, Request, Response } from "express";
import { Candidate } from "../../../shared/models/Candidate.ts";

class UserController {
  async getUser(req: Request, res: Response, next: NextFunction) {
    try {
      switch (req.user?.role) {
        case "candidate":
          const candidateUser = await Candidate.findById(req.user.id).select(
            "-password"
          );

          return res.json(candidateUser);
        default:
          res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      next(error);
    }
  }
}

const { getUser } = new UserController();
export { getUser };

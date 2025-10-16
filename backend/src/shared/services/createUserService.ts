import { ClientSession, Document } from "mongoose";
import { Candidate } from "../models/Candidate.ts";
import { Employer } from "../models/Employer.ts";
import { Role } from "../types/user/role.ts";

export const createUser = async <T>(
  role: Role,
  data: T,
  session?: ClientSession
) => {
  switch (role) {
    case "candidate":
      const candidateUser = new Candidate(data);
      await candidateUser.save({ session });
      return candidateUser;
  }
};

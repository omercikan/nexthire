import { Candidate } from "../models/Candidate.ts";
import { Role } from "../types/user/role.ts";

export const createUser = async <T>(role: Role, data: T) => {
  switch (role) {
    case "candidate":
      const candidateUser = await Candidate.create(data);
      return candidateUser;
  }
};

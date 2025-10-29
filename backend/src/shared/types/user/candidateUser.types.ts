import { User } from "./user.types";

export interface CandidateTypes extends User {
  profilePhoto: string;
  role: "candidate";
}

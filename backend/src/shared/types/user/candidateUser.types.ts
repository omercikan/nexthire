import { User } from "./user.types";

export interface CandidateTypes extends User {
  profilePhoto: string;
  profilePhotoId: string;
  dateOfBirth: string;
  gender: string;
  age: string;
  title: string;
  role: "candidate";
}

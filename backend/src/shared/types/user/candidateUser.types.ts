import { Document } from "mongoose";

export interface CandidateTypes extends Document {
  _id: string;
  fullname: string;
  email: string;
  password: string;
  role: "candidate";
}

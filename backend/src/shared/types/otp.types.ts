import { Document, ObjectId } from "mongoose";

export interface OtpTypes extends Document {
  userId: ObjectId;
  userModel: "Candidate" | "Employer";
  token: string;
  code: string;
  expiration: number;
}

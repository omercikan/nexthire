import { Document, ObjectId } from "mongoose";

export interface OtpTypes extends Document {
  userId: ObjectId;
  token: string;
  code: string;
  expiration: number;
}

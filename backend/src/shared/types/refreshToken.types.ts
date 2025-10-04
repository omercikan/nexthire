import { Document, ObjectId } from "mongoose";

export interface RefreshTokenTypes extends Document {
  token: string;
  userId: ObjectId;
}

import { model, Schema } from "mongoose";
import { OtpTypes } from "../types/otp.types";

const OtpSchema = new Schema<OtpTypes>({
  userId: {
    type: Schema.Types.ObjectId,
    refPath: "userModel",
    required: true,
  },

  userModel: {
    type: String,
    required: true,
    enum: ["Candidate", "Employer"],
  },

  token: {
    type: String,
    required: true,
  },

  code: { type: String, required: true },

  expiration: {
    type: Number,
    required: true,
  },
});

export const Otp = model("otp", OtpSchema);

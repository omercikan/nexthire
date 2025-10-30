import { model, Schema } from "mongoose";
import { OtpTypes } from "../types/otp.types";

const OtpSchema = new Schema<OtpTypes>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
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

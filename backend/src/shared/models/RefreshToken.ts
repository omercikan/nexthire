import { model, Schema } from "mongoose";
import { RefreshTokenTypes } from "../types/refreshToken.types.ts";

const RefreshTokenSchema = new Schema<RefreshTokenTypes>(
  {
    token: {
      type: String,
      required: true,
    },

    userId: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

export const RefreshToken = model("refreshTokens", RefreshTokenSchema);

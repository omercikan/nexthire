import { model, Schema } from "mongoose";
import { CandidateTypes } from "../types/user/candidateUser.types.ts";

const CandidateSchema = new Schema<CandidateTypes>(
  {
    fullname: {
      type: String,
      required: true,
      minlength: 3,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Invalid email adress",
      ],
    },

    password: {
      type: String,
      required: false,
      minLength: 8,
    },

    profilePhoto: {
      type: String,
      required: false,
    },

    role: {
      type: String,
      default: "candidate",
    },
  },
  { timestamps: true, versionKey: false }
);

export const Candidate = model("users", CandidateSchema);

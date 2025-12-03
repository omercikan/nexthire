import { CallbackError, model, Schema } from "mongoose";
import config from "../../config";
import bcrypt from "bcrypt";

const UserSchema = new Schema(
  {
    // Common areas
    fullname: {
      type: String,
      required: true,
      minlength: 3,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: String,
    phoneNumber: String,
    city: String,

    role: {
      type: String,
      enum: ["candidate", "employer"],
      required: true,
    },

    // Candidate fields
    profilePhoto: {
      type: String,
      required: false,
    },
    dateOfBirth: { type: String, required: false },
    gender: { type: String, required: false },
    age: { type: String, required: false },
    title: { type: String, required: false },

    // Employer fields
    companyName: String,
    district: String,
    taxCity: String,
    taxOffice: String,
    taxNumber: String,
    emailConsent: Boolean,

    // Common areas
    personalDataConsent: {
      type: Boolean,
      default: true,
    },
    failedAttempts: { type: Number, default: 0 },
    failedTime: { type: Number, default: 0 },
  },
  { timestamps: true, versionKey: false }
);

UserSchema.pre("save", async function (next) {
  if (this.password && this.role === "candidate") {
    try {
      this.password = await bcrypt.hash(this.password, config.saltRounds);
    } catch (err) {
      return next(err as CallbackError);
    }
  }
});

export const User = model("User", UserSchema);

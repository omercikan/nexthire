import { model, Schema } from "mongoose";

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

    // Employer fields
    phoneNumber: String,
    companyName: String,
    city: String,
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
    provider: { type: String, required: true, enum: ["Google", "Form"] },
  },
  { timestamps: true, versionKey: false }
);

export const User = model("User", UserSchema);

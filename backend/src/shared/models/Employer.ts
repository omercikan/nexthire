import { model, Schema } from "mongoose";
import { EmployerTypes } from "../types/user/employerUser.types.ts";

const EmployerSchema = new Schema<EmployerTypes>(
  {
    fullname: {
      type: String,
      required: true,
    },

    phoneNumber: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: String,

    companyName: {
      type: String,
      required: true,
    },

    city: {
      type: String,
      required: true,
    },

    district: {
      type: String,
      required: true,
    },

    taxCity: {
      type: String,
      required: true,
    },

    taxOffice: {
      type: String,
      required: true,
    },

    taxNumber: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["employer"],
      default: "employer",
    },

    emailConsent: {
      type: Boolean,
      default: false,
    },

    personalDataConsent: {
      type: Boolean,
      default: true,
      required: true,
    },

    failedAttempts: { type: Number, default: 0 },
    failedTime: Number,
  },
  { timestamps: true, versionKey: false }
);

export const Employer = model("Employer", EmployerSchema);

import { model, Schema } from "mongoose";

const jobSchema = new Schema(
  {
    employerId: { type: Schema.Types.ObjectId, ref: "users", requried: true },
    jobDescription: { type: String, required: true },
    jobTitle: { type: String, required: true },
    minSalary: { type: String, required: true },
    maxSalary: { type: String, required: true },
    experience: { type: String, required: true },
    careerLevel: { type: String, required: true },
    introductionUrl: { type: String },
    category: { type: String, required: true },
    workType: { type: String, required: true },
    gender: { type: String, required: true },
    salaryPeriod: { type: String, required: true },
    educationLevel: { type: String, required: true },
    applicationMethod: {
      type: String,
      required: true,
      enum: ["NextHire", "email", "external_link"],
    },
    applicationAddress: {
      type: String,
      required: function () {
        return this.applicationMethod !== "NextHire";
      },
    },
  },
  { timestamps: true, versionKey: false }
);

export const Job = model("jobs", jobSchema);

import { model, Schema } from "mongoose";

const jobSchema = new Schema(
  {
    employerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
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
    location: { type: String, required: true },
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
    screeningQuestions: [
      new Schema(
        {
          id: String,
          question: String,
          type: String,
          characterLimit: { type: String, required: false },
          options: { type: [Schema.Types.String], required: false },
          required: Boolean,
          knockout: Boolean,
          correctAnswer: { type: String, required: false },
          knockoutAnswer: { type: String, required: false },
        },
        { _id: false },
      ),
    ],
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

jobSchema.set("toJSON", {
  virtuals: true,
  transform(_doc, ret) {
    const { employerId, id, ...rest } = ret as typeof ret & { id: string };

    return rest;
  },
});

jobSchema.virtual("employer", {
  ref: "User",
  localField: "employerId",
  foreignField: "_id",
  justOne: true,
});

jobSchema.index({ createdAt: -1 });
jobSchema.index({ employerId: 1 });

export const Job = model("jobs", jobSchema);

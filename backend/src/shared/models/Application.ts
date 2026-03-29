import { model, Schema } from "mongoose";

const ApplicationSchema = new Schema(
  {
    candidateId: { type: Schema.Types.ObjectId, ref: "users", required: true },
    employerId: { type: Schema.Types.ObjectId, ref: "users", required: true },
    jobId: { type: Schema.Types.ObjectId, ref: "jobs", required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    resume: {
      url: String,
      originalName: String,
      size: Number,
    },
    screeningQuestions: [
      {
        question: String,
        answer: { type: Schema.Types.Mixed },
      },
    ],
    status: {
      type: [
        {
          value: {
            type: String,
            enum: ["pending", "reviewed", "accepted", "rejected"],
          },
          changedAt: {
            type: Date,
            default: Date.now,
          },
        },
      ],
      default: () => [{ value: "pending", changedAt: new Date() }],
    },
  },
  { timestamps: true },
);

export const Application = model("application", ApplicationSchema);

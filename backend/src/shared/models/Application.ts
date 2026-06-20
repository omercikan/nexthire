import { InferSchemaType, model, Schema } from "mongoose";

const statusEnum = [
  "pending",
  "reviewed",
  "accepted",
  "rejected",
  "auto_rejected",
  "scheduled",
  "shortlisted",
  "interviewed",
  "hired",
];

const ApplicationSchema = new Schema(
  {
    candidateId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    employerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    jobId: { type: Schema.Types.ObjectId, ref: "jobs", required: true },
    interviewId: { type: Schema.Types.ObjectId, ref: "Interview" },
    fullname: { type: String, required: true },
    title: String,
    profilePhoto: { type: String, required: false },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    city: String,
    lastWorkPlace: String,
    experienceTime: String,
    resume: {
      url: String,
      originalName: String,
      fileName: String,
      size: Number,
    },
    screeningQuestions: [
      {
        question: String,
        answer: { type: Schema.Types.Mixed },
        knockout: Boolean,
        knockoutAnswer: { type: String, required: false },
      },
    ],
    status: {
      type: [
        {
          _id: false,
          value: {
            type: String,
            enum: statusEnum,
          },
          changedAt: {
            type: Date,
            default: Date.now,
          },
        },
      ],
      default: () => [{ value: "pending", changedAt: new Date() }],
    },
    currentStatus: {
      type: String,
      enum: statusEnum,
      default: "pending",
    },
  },
  { timestamps: true },
);

ApplicationSchema.index({
  jobId: 1,
  employerId: 1,
  currentStatus: 1,
  createdAt: -1,
});

export const Application = model("application", ApplicationSchema);

export type IApplication = InferSchemaType<typeof ApplicationSchema>;

import { model, Schema } from "mongoose";

const ResumeSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    fileName: { type: String, required: true },
    originalName: { type: String, required: true },
    size: { type: String, required: true },
    fileUrl: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Resume = model("resume", ResumeSchema);

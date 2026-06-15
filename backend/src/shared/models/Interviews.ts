import mongoose, { Document, Schema } from "mongoose";

export interface IStatusHistory {
  status: "scheduled" | "completed" | "cancelled" | "no_show";
  changedAt: Date;
  changedBy: mongoose.Types.ObjectId;
  reason?: string;
}

export interface IInterview extends Document {
  candidateId: mongoose.Types.ObjectId;
  interviewerId: mongoose.Types.ObjectId;
  scheduledAt: string;
  time: string;
  type: "online" | "in_person";
  meetingLink?: string;
  location?: string;
  positionId?: mongoose.Types.ObjectId;
  positionTitle: string;
  notes?: string;
  status: "scheduled" | "completed" | "cancelled" | "no_show";
  statusHistory: IStatusHistory[];
  createdAt: Date;
  updatedAt: Date;
}

const InterviewSchema = new Schema<IInterview>(
  {
    candidateId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    interviewerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    scheduledAt: { type: String, required: true },
    time: { type: String, required: true },
    type: { type: String, enum: ["online", "in_person"], required: true },
    meetingLink: { type: String },
    location: { type: String },
    positionId: { type: Schema.Types.ObjectId, ref: "Job" },
    positionTitle: { type: String, required: true },
    notes: { type: String },
    status: {
      type: String,
      enum: ["scheduled", "completed", "cancelled", "no_show"],
      default: "scheduled",
    },
    statusHistory: {
      type: [
        {
          status: {
            type: String,
            enum: ["scheduled", "completed", "cancelled", "no_show"],
            required: true,
          },
          changedAt: { type: Date, default: Date.now },
          changedBy: { type: Schema.Types.ObjectId, ref: "User" },
          reason: { type: String, required: false },
        },
      ],
      default: [],
    },
  },
  { timestamps: true },
);

const Interview =
  mongoose.models.Interview ||
  mongoose.model<IInterview>("Interview", InterviewSchema);

export default Interview;

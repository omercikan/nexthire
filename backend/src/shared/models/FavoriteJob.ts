import { model, Schema } from "mongoose";

const FavoriteJobSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "user", required: true },
    jobId: { type: Schema.Types.ObjectId, ref: "jobs", required: true },
    companyLocation: { type: String, required: false },
    jobCategory: { type: String, required: true },
    jobTitle: { type: String, required: true },
    companyLogo: String,
  },
  { timestamps: true }
);

export const FavoriteJob = model("favoritejob", FavoriteJobSchema);

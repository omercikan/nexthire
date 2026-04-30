import { Types } from "mongoose";
import { Job } from "../../../../shared/models/Job";

export class JobService {
  async getEmployerJobs(employerId: string, page: number) {
    const limit = 10;
    const skip = (page - 1) * limit;
    const objectEmployerId = new Types.ObjectId(employerId);

    return Job.aggregate([
      { $match: { employerId: objectEmployerId } },
      {
        $lookup: {
          from: "applications",
          localField: "_id",
          foreignField: "jobId",
          as: "applications",
        },
      },
      { $sort: { createdAt: -1 } },
      { $skip: skip },
      { $limit: limit },
      {
        $project: {
          _id: 1,
          jobTitle: 1,
          category: 1,
          department: 1,
          location: "$jobLocation",
          workType: 1,
          applicants: { $size: "$applications" },
          status: 1,
          createdAt: 1,
        },
      },
    ]);
  }

  async getEmployerStats(employerId: string) {
    const objectEmployerId = new Types.ObjectId(employerId);

    const [stats] = await Job.aggregate([
      { $match: { employerId: objectEmployerId } },
      {
        $lookup: {
          from: "applications",
          localField: "_id",
          foreignField: "jobId",
          as: "applications",
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          totalApplications: { $sum: { $size: "$applications" } },
          published: {
            $sum: {
              $cond: {
                if: { $eq: ["$status", "published"] },
                then: 1,
                else: 0,
              },
            },
          },
          passive: {
            $sum: {
              $cond: {
                if: { $eq: ["$status", "passive"] },
                then: 1,
                else: 0,
              },
            },
          },
          draft: {
            $sum: {
              $cond: {
                if: { $eq: ["$status", "draft"] },
                then: 1,
                else: 0,
              },
            },
          },
        },
      },
      { $project: { _id: 0 } },
    ]);
    return stats ?? null;
  }
}

export const jobService = new JobService();

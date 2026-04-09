import { Request, Response, NextFunction } from "express";
import { Job as JobModel } from "../../../../shared/models/Job";
import { connectRedis } from "../../../../config/redis";

export class Job {
  async createJob(req: Request, res: Response, next: NextFunction) {
    const body = req.body;
    const { jobId, action } = req.query;

    const employerFields =
      "profilePhoto companyName categories companySize _id city email phoneNumber website socialPlatforms foundedDate";

    const sanitizedData = Object.fromEntries(
      Object.entries(body).filter(([_, k]) => Boolean(k)),
    );

    try {
      const redis = connectRedis.getClient();

      if (jobId) {
        const job = await JobModel.findById(String(jobId));

        if (!job) {
          return res.status(404).json({ message: "Job not found" });
        }

        if (job.status !== "draft") {
          return res
            .status(400)
            .json({ message: "Only draft jobs can be published" });
        }

        const updatedJob = await JobModel.findByIdAndUpdate(
          String(jobId),
          { ...sanitizedData, status: action, publishedAt: Date.now() },
          { new: true },
        )
          .populate("employer", employerFields)
          .lean();

        await redis.setex(
          `job:${jobId}`,
          3600,
          JSON.stringify({ job: updatedJob }),
        );

        return res.status(200).json(updatedJob);
      }

      const createdJob = await JobModel.create(sanitizedData);
      const populatedJob = await createdJob.populate(
        "employer",
        employerFields,
      );

      await redis.setex(
        `job:${createdJob._id}`,
        3600,
        JSON.stringify({ job: populatedJob }),
      );

      return res.status(201).json(populatedJob);
    } catch (error) {
      next(error);
    }
  }
}

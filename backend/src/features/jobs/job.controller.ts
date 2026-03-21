import { Request, Response, NextFunction } from "express";
import { JobService } from "./job.service";
import { Job } from "../../shared/models/Job";
import { connectRedis } from "../../config/redis";

export class JobEvents {
  private jobService: JobService;

  constructor() {
    this.jobService = new JobService();
  }

  getJobs = async (req: Request, res: Response, next: NextFunction) => {
    const page = Number(req.query.page);
    const limit = 10;

    try {
      const { currentCounts, jobs, totalCounts } =
        await this.jobService.fetchPaginatedJobs(page, limit);

      if (!jobs.length) {
        return res
          .status(404)
          .json({ message: "Requested page not found", currentCounts });
      }

      return res.json({
        totalCount: [{ count: totalCounts }],
        data: jobs,
      });
    } catch (error) {
      next(error);
    }
  };

  getJob = async (req: Request, res: Response, next: NextFunction) => {
    const { jobId } = req.params;

    try {
      const cacheKey = `job:${jobId}`;
      const redis = connectRedis.getClient();

      const cachedJob = await redis.get(cacheKey);
      let job;

      if (cachedJob) {
        job = JSON.parse(cachedJob);
      } else {
        const employerFields =
          "profilePhoto companyName categories companySize _id city email phoneNumber website socialPlatforms foundedDate";

        job = await Job.findById(jobId)
          .populate("employer", employerFields)
          .lean();

        if (!job) {
          return res.status(404).json({ message: "Job listing not found." });
        }

        const { employerId, ...rest } = job;
        job = rest;

        await redis.setex(cacheKey, 3600, JSON.stringify(job));
      }

      const relatedJobs = await Job.find({
        _id: { $ne: jobId },
        category: job.category,
        location: job.location,
      })
        .limit(3)
        .populate("employer", "profilePhoto companyName _id")
        .select("jobTitle category location workType experience _id employerId")
        .lean({ virtuals: true });

      return res.json({ job, relatedJobs });
    } catch (error) {
      next(error);
    }
  };

  filterJobs = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const jobs = await this.jobService.filteredJobs(req.query, req.body);

      return res.json(jobs[0]);
    } catch (error) {
      next(error);
    }
  };

  handleFavorite = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { response, status } = await this.jobService.handleJobFavorite(
        req.body,
      );

      return res.status(status).json(response);
    } catch (error) {
      next(error);
    }
  };

  getFavorite = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id;

    if (!userId) return;

    try {
      const favoriteResponse = await this.jobService.fetchFavorites(userId);
      return res.json(favoriteResponse);
    } catch (error) {
      next(error);
    }
  };
}

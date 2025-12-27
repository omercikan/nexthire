import { Request, Response, NextFunction } from "express";
import { JobService } from "./job.service";

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
        currentCounts,
        totalCounts,
        jobs,
      });
    } catch (error) {
      next(error);
    }
  };

  filterJobs = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { jobs, counts } = await this.jobService.filteredJobs(
        req.query,
        req.body
      );

      return res.json({ counts, jobs });
    } catch (error) {
      next(error);
    }
  };
}

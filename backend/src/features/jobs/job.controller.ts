import { Request, Response, NextFunction } from "express";
import { JobService } from "./job.service";
import { FavoriteJob } from "../../shared/models/FavoriteJob";

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
        req.body
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

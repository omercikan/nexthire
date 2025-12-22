import { Request, Response, NextFunction } from "express";
import { Job as JobModel } from "../../../../shared/models/Job";

export class Job {
  async createJob(req: Request, res: Response, next: NextFunction) {
    const data = req.body;

    try {
      const sanitizedData = Object.fromEntries(
        Object.entries(data).filter(([_, k]) => Boolean(k))
      );

      const createdJob = await JobModel.create(sanitizedData);

      return res.status(201).json(createdJob);
    } catch (error) {
      next(error);
    }
  }
}

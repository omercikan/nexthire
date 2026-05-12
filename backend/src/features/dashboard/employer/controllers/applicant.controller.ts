import { Request, Response, NextFunction } from "express";
import { Application } from "../../../../shared/models/Application";
import { applicantService } from "../services/applicant.service";

interface QueryRequestParams {
  page: string;
  search: string;
  status: string;
}

class ApplicantController {
  async getApplicants(req: Request, res: Response, next: NextFunction) {
    const { jobId } = req.params;
    const {
      page = 1,
      search,
      status,
    } = req.query as unknown as QueryRequestParams;
    const limit = 10;
    const skip = (Number(page) - 1) * limit;
    const employerId = req.user.id;

    const { filters, andConditions } = applicantService.setFilters(
      search,
      status,
      jobId,
      employerId,
    );

    try {
      const [applicants, total, statusCounts] = await Promise.all([
        applicantService.getApplicants(skip, limit, filters),
        Application.countDocuments(filters),
        applicantService.getStatusCounts(
          jobId,
          employerId,
          search,
          andConditions,
        ),
      ]);

      const totalPages = Math.ceil(total / limit);

      res.json({
        success: true,
        count: total,
        data: applicants,
        hasNextPage: Number(page) < totalPages,
        statusCounts,
      });
    } catch (error) {
      next(error);
    }
  }
}

export const Applicant = new ApplicantController();

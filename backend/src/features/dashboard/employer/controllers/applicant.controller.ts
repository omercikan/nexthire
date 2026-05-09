import { Request, Response, NextFunction } from "express";
import { Application } from "../../../../shared/models/Application";

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
    const trimmedSearch = search?.trim();

    const andConditions = [];

    if (trimmedSearch) {
      andConditions.push({
        $or: [
          { fullname: { $regex: trimmedSearch, $options: "i" } },
          { title: { $regex: trimmedSearch, $options: "i" } },
        ],
      });
    }

    if (status) {
      andConditions.push({
        $expr: {
          $eq: [{ $arrayElemAt: ["$status.value", -1] }, status],
        },
      });
    }

    const filter = {
      ...(andConditions.length > 0 && { $and: andConditions }),
      jobId,
      employerId,
    };

    try {
      const [applicants, total] = await Promise.all([
        Application.find(filter)
          .select("-__v")
          .sort({ createdAt: -1, _id: -1 })
          .skip(skip)
          .limit(limit)
          .lean(),
        Application.countDocuments(filter),
      ]);

      const totalPages = Math.ceil(total / limit);

      res.json({
        success: true,
        count: total,
        data: applicants,
        hasNextPage: Number(page) < totalPages,
      });
    } catch (error) {
      next(error);
    }
  }
}

export const Applicant = new ApplicantController();

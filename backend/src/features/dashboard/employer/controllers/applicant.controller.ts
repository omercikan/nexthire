import { Request, Response, NextFunction } from "express";
import { Application } from "../../../../shared/models/Application";
import { Types } from "mongoose";

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

    const last24h = new Date(Date.now() - 1000 * 60 * 60 * 24);
    if (status === "new") {
      andConditions.push({ createdAt: { $gte: last24h } });
    }

    if (status && status !== "new") {
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
      const [applicants, total, statusCountResults] = await Promise.all([
        Application.find(filter)
          .select("-__v")
          .sort({ createdAt: -1, _id: -1 })
          .skip(skip)
          .limit(limit)
          .lean(),
        Application.countDocuments(filter),
        Application.aggregate([
          {
            $match: {
              jobId: new Types.ObjectId(jobId),
              employerId: new Types.ObjectId(employerId),
              ...(!!trimmedSearch && { $and: andConditions }),
            },
          },
          {
            $facet: {
              statusCounts: [
                {
                  $addFields: {
                    lastStatus: { $arrayElemAt: ["$status.value", -1] },
                  },
                },
                { $group: { _id: "$lastStatus", count: { $sum: 1 } } },
                { $project: { _id: 0, status: "$_id", count: 1 } },
              ],

              newCount: [
                { $match: { createdAt: { $gte: last24h } } },
                { $count: "count" },
              ],
            },
          },
        ]),
      ]);

      const statusCounts = statusCountResults[0].statusCounts;
      const newCount = statusCountResults[0].newCount[0]?.count || 0;

      const allCount = statusCounts.reduce(
        (acc: number, item: { count: number }) => acc + item.count,
        0,
      );
      statusCounts.unshift(
        { status: "all", count: allCount },
        { status: "new", count: newCount },
      );

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

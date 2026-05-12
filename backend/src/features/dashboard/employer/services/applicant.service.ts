import { Types } from "mongoose";
import { Application } from "../../../../shared/models/Application";

interface ApplicantFilters {
  $and?: object[];
  jobId: string;
  employerId: string;
}

class ApplicantService {
  private get last24h() {
    return new Date(Date.now() - 1000 * 60 * 60 * 24);
  }

  setFilters(
    search: string,
    status: string,
    jobId: string,
    employerId: string,
  ) {
    const andConditions: object[] = [];
    const trimmedSearch = search?.trim();

    if (trimmedSearch) {
      andConditions.push({
        $or: [
          { fullname: { $regex: trimmedSearch, $options: "i" } },
          { title: { $regex: trimmedSearch, $options: "i" } },
        ],
      });
    }

    if (status === "new") {
      andConditions.push({ createdAt: { $gte: this.last24h } });
    }

    if (status && status !== "new") {
      andConditions.push({ currentStatus: status });
    }

    const filters: ApplicantFilters = {
      ...(andConditions.length > 0 && { $and: andConditions }),
      jobId,
      employerId,
    };

    return { filters, andConditions };
  }

  getApplicants(skip: number, limit: number, filters: ApplicantFilters) {
    return Application.find(filters)
      .select("-__v")
      .sort({ createdAt: -1, _id: -1 })
      .skip(skip)
      .limit(limit)
      .lean();
  }

  async getStatusCounts(
    jobId: string,
    employerId: string,
    search: string,
    andConditions: object[],
  ) {
    const trimmedSearch = search?.trim();

    const results = await Application.aggregate([
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
            { $group: { _id: "$currentStatus", count: { $sum: 1 } } },
            { $project: { _id: 0, status: "$_id", count: 1 } },
          ],

          newCount: [
            { $match: { createdAt: { $gte: this.last24h } } },
            { $count: "count" },
          ],
        },
      },
    ]);

    const statusCounts = results[0].statusCounts;
    const newCount = results[0].newCount[0]?.count || 0;

    const allCount = statusCounts.reduce(
      (acc: number, item: { count: number }) => acc + item.count,
      0,
    );

    statusCounts.unshift(
      { status: "all", count: allCount },
      { status: "new", count: newCount },
    );

    return statusCounts;
  }
}

export const applicantService = new ApplicantService();

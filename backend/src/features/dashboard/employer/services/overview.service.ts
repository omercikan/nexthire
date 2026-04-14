import mongoose, { FilterQuery } from "mongoose";
import { IJob, Job } from "../../../../shared/models/Job";
import {
  Application,
  IApplication,
} from "../../../../shared/models/Application";
import { convertMonths, monthNames } from "../utils/convert-months";

interface PopulatedApplication {
  candidateId: { fullname: string };
  jobId: { jobTitle: string };
  status: { value: string; changedAt: Date }[];
  updatedAt: Date;
}

export class EmployerOverviewService {
  private get now() {
    return new Date();
  }

  private get thisMonthStart() {
    return new Date(this.now.getFullYear(), this.now.getMonth(), 1);
  }

  private countJobDocuments = async (
    userId: string,
    otherFilters?: FilterQuery<IJob>,
  ) => {
    return await Job.countDocuments({ employerId: userId, ...otherFilters });
  };

  private countApplicationDocuments = async (
    userId: string,
    otherFilters?: FilterQuery<IApplication>,
  ) => {
    return await Application.countDocuments({
      employerId: userId,
      ...otherFilters,
    });
  };

  totalJobs = async (userId: string) => {
    const lastMonthStart = new Date(
      this.now.getFullYear(),
      this.now.getMonth() - 1,
      1,
    );

    return await Promise.all([
      this.countJobDocuments(userId),
      this.countJobDocuments(userId, {
        createdAt: { $gte: this.thisMonthStart },
      }),
      this.countJobDocuments(userId, {
        createdAt: {
          $gte: lastMonthStart,
          $lt: this.thisMonthStart,
        },
      }),
    ]);
  };

  activeJobs = async (userId: string) => {
    return await Promise.all([
      this.countJobDocuments(userId, { status: "published" }),
      this.countJobDocuments(userId, {
        status: "published",
        updatedAt: { $gte: this.thisMonthStart },
      }),
      this.countJobDocuments(userId, {
        status: "closed",
        updatedAt: { $gte: this.thisMonthStart },
      }),
    ]);
  };

  totalApplications = async (userId: string) => {
    return await Promise.all([
      this.countApplicationDocuments(userId),
      this.countApplicationDocuments(userId, {
        createdAt: { $gte: this.thisMonthStart },
      }),
    ]);
  };

  newApplicants = async (userId: string) => {
    const sevenDaysAgo = new Date(this.now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const fourteenDaysAgo = new Date(
      this.now.getTime() - 14 * 24 * 60 * 60 * 1000,
    );

    return await Promise.all([
      this.countApplicationDocuments(userId, {
        createdAt: { $gte: sevenDaysAgo },
      }),
      this.countApplicationDocuments(userId, {
        createdAt: { $gte: fourteenDaysAgo, $lt: sevenDaysAgo },
      }),
    ]);
  };

  scheduledInterviews = async (userId: string) => {
    const startOfWeek = new Date(this.now);
    const day = this.now.getDay();
    const diff = day === 0 ? 6 : day - 1;
    startOfWeek.setDate(this.now.getDate() - diff);
    startOfWeek.setHours(0, 0, 0, 0);
    const startOfLastWeek = new Date(startOfWeek);
    startOfLastWeek.setDate(startOfWeek.getDate() - 7);

    return await Promise.all([
      this.countApplicationDocuments(userId, {
        "status.value": "scheduled",
        "status.changedAt": { $gte: startOfWeek },
      }),
      this.countApplicationDocuments(userId, {
        "status.value": "scheduled",
        "status.changedAt": { $gte: startOfLastWeek, $lt: startOfWeek },
      }),
    ]);
  };

  applicantTrendsPipeline = async (userId: string) => {
    const sixMonthsAgo = new Date(
      this.now.getFullYear(),
      this.now.getMonth() - 5,
      1,
    );

    return await Application.aggregate([
      {
        $match: {
          employerId: new mongoose.Types.ObjectId(userId),
          createdAt: { $gte: sixMonthsAgo },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]);
  };

  formatApplicantTrends = (
    results: { _id: { year: number; month: number }; count: number }[],
  ) => {
    const allMonths = Array.from({ length: 6 }, (_, i) => {
      const date = new Date(
        this.now.getFullYear(),
        this.now.getMonth() - 5 + i,
        1,
      );

      return {
        month: convertMonths(date),
        year: date.getFullYear(),
        applications: 0,
      };
    });

    results.forEach((item) => {
      const index = allMonths.findIndex(
        (m) =>
          m.year === item._id.year &&
          m.month === monthNames[item._id.month - 1],
      );

      if (index !== -1) allMonths[index].applications = item.count;
    });

    return allMonths.map(({ month, applications }) => ({
      month,
      applications,
    }));
  };

  jobPerformancePipeline = async (userId: string) => {
    return await Job.aggregate([
      {
        $match: {
          employerId: new mongoose.Types.ObjectId(userId),
          status: "published",
        },
      },
      {
        $lookup: {
          from: "applications",
          localField: "_id",
          foreignField: "jobId",
          as: "applications",
        },
      },
      {
        $project: {
          _id: 0,
          job: "$jobTitle",
          views: 1,
          applications: { $size: "$applications" },
        },
      },
      { $sort: { views: -1 } },
      { $limit: 6 },
    ]);
  };

  recentActivity = async (userId: string) => {
    return await Application.find({ employerId: userId })
      .sort({ updatedAt: -1 })
      .select("status updatedAt")
      .populate("candidateId", "fullname")
      .populate("jobId", "jobTitle")
      .limit(6)
      .lean<PopulatedApplication[]>();
  };

  formatRecentActivity = (activities: PopulatedApplication[]) => {
    return activities.map((activity) => ({
      fullname: activity.candidateId.fullname,
      jobTitle: activity.jobId.jobTitle,
      status: activity.status.at(-1)?.value,
      updatedAt: activity.updatedAt,
    }));
  };
}

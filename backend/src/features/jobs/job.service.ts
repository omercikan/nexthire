import { Job } from "../../shared/models/Job";

export class JobService {
  async fetchPaginatedJobs(page: number, limit: number) {
    const skip = (page - 1) * limit;
    const selectFields = "jobTitle category workType careerLevel";

    const [jobs, totalCounts] = await Promise.all([
      Job.find()
        .select(selectFields)
        .limit(limit)
        .skip(skip)
        .populate("employerId", "companyLogo"),
      Job.countDocuments(),
    ]);

    return {
      currentCounts: jobs.length,
      totalCounts,
      jobs,
    };
  }
}

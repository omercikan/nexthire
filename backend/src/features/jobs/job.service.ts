import { Job } from "../../shared/models/Job";
import { BodyFields, FavoriteRequests, QueryFields, SortOrder } from "./types";
import { JOB_QUERY_OPTIONS } from "./constants";
import { FilterJobHelpers } from "./helpers/filter-job.helper";
import { FavoriteJob } from "../../shared/models/FavoriteJob";
import { FavoriteJobHelpers } from "./helpers/favorite-job.helper";
const { selectFields, populatePath, populateFields } = JOB_QUERY_OPTIONS;

export class JobService {
  async fetchPaginatedJobs(page: number, limit: number) {
    const skip = (page - 1) * limit;

    const [jobs, totalCounts] = await Promise.all([
      Job.find()
        .select(selectFields)
        .limit(limit)
        .skip(skip)
        .sort({ createdAt: -1 })
        .populate(populatePath, populateFields),
      Job.countDocuments(),
    ]);

    return {
      currentCounts: jobs.length,
      totalCounts,
      jobs,
    };
  }

  async filteredJobs(
    queryFields: Partial<QueryFields>,
    bodyFields: BodyFields
  ) {
    const { page = 1, perPage = 10, sort = -1 } = queryFields;

    const { getPagination, createFilters } = new FilterJobHelpers();

    const { limit, skip } = getPagination(perPage, page);
    const pipeline = createFilters(
      bodyFields,
      limit,
      skip,
      Number(sort) as SortOrder
    );

    const jobs = await Job.aggregate(pipeline);

    return jobs;
  }

  async fetchFavorites(userId: string) {
    const favoriteJobs = await FavoriteJob.find({ userId }).select(
      "jobId -_id"
    );

    const ids: string[] = [];

    favoriteJobs.forEach((id) => ids.push(id.jobId.toString()));

    return ids;
  }

  async handleJobFavorite(data: FavoriteRequests) {
    const { isFavorite, userId, jobId } = data;
    const { controlJob } = new FavoriteJobHelpers();

    const ids = await this.fetchFavorites(userId);

    switch (isFavorite) {
      case false:
        const response = await controlJob(data, ids);
        return response;
      case true:
        const removedJob = await FavoriteJob.deleteOne({ userId, jobId });
        return { response: removedJob, status: 200 };
      default:
        return {
          response: { message: "Invalid isFavorite value" },
          status: 400,
        };
    }
  }
}

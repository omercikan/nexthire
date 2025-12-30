import { Job } from "../../shared/models/Job";
import { BodyFields, QueryFields } from "./types";
import { JOB_QUERY_OPTIONS } from "./constants";
import { FilterJobHelpers } from "./helpers/filter-job.helper";

const { selectFields, populatePath, populateFields } = JOB_QUERY_OPTIONS;

export class JobService {
  async fetchPaginatedJobs(page: number, limit: number) {
    const skip = (page - 1) * limit;

    const [jobs, totalCounts] = await Promise.all([
      Job.find()
        .select(selectFields)
        .limit(limit)
        .skip(skip)
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
    const { page = 1, perPage = 10, sort = 1 } = queryFields;

    const { getPagination, createFilters } = new FilterJobHelpers();

    const { limit, skip } = getPagination(perPage, page);
    const pipeline = createFilters(bodyFields, limit, skip);

    const jobs = await Job.aggregate(pipeline).sort({
      createdAt: Number(sort) === 1 ? "desc" : "asc",
    });

    return jobs;
  }
}

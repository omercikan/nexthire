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
    const { page = 1, sort = 1, perPage = 10 } = queryFields;

    const { getPagination, getShort, createFilters } = new FilterJobHelpers();

    const { limit, skip } = getPagination(perPage, page);
    const filters = createFilters(bodyFields);
    const sortValue = getShort(sort, filters);

    const [jobs, counts] = await Promise.all([
      Job.find(filters)
        .sort(sortValue as any)
        .skip(skip)
        .limit(limit)
        .select(selectFields)
        .populate(populatePath, populateFields)
        .lean(),
      Job.countDocuments(filters),
    ]);

    return { jobs, counts };
  }
}

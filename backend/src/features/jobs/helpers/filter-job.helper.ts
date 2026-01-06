import { FILTER_JOB_PIPELINE } from "../constants";
import { BodyFields, PerPage, SortOrder } from "../types";

export class FilterJobHelpers {
  getPagination(perPage: PerPage, page: number) {
    const limit = perPage === "all" ? 0 : Number(perPage);
    const skip = limit > 0 ? limit * (Number(page) - 1) : 0;

    return { limit, skip };
  }

  createFilters(
    fields: BodyFields,
    limit: number,
    skip: number,
    sort: SortOrder
  ) {
    const should = [];
    const pipeline = [];

    for (const [k, v] of Object.entries(fields)) {
      if (!v) continue;

      if (Array.isArray(v)) {
        v.filter((item) => item).forEach((item) => {
          should.push({
            text: {
              query: item,
              path: k,
            },
          });
        });
      } else {
        should.push({
          text: {
            query: v,
            path: k,
          },
        });
      }
    }

    if (should.length) {
      pipeline.push({
        $search: {
          index: "jobs_search",
          compound: {
            should,
            minimumShouldMatch: 1,
          },
        },
      });
    }

    const { $lookup, $project } = FILTER_JOB_PIPELINE;

    pipeline.push({ $lookup });
    pipeline.push({ $project });

    const dataPipeline = [{ $skip: skip }] as {
      $limit: number;
      $skip?: number;
    }[];

    pipeline.push({ $sort: { createdAt: sort } });

    if (limit !== 0) dataPipeline.push({ $limit: limit });

    pipeline.push({
      $facet: {
        data: dataPipeline,
        totalCount: [{ $count: "count" }],
      },
    });

    return pipeline;
  }
}

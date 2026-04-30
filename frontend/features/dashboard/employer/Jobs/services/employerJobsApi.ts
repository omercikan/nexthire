import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { JobStats, JobSummary } from "../types/employerJobsTypes";

export const employerJobsApi = createApi({
  reducerPath: "employerJobsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/employer/jobs/employer`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getEmployerJobs: builder.query<
      {
        jobs: JobSummary[];
        stats: JobStats | null;
      },
      { page: string }
    >({
      query: ({ page }) => ({
        url: "/",
        method: "GET",
        params: { page },
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useGetEmployerJobsQuery } = employerJobsApi;

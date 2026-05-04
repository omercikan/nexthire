import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { JobStats, Job } from "../types/employerJobsTypes";

export const employerJobsApi = createApi({
  reducerPath: "employerJobsApi",
  tagTypes: ["EmployerJobs"],
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/employer/jobs`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getEmployerJobs: builder.query<
      {
        jobs: Job[];
        stats: JobStats | null;
        totalPages: number;
      },
      { page: string }
    >({
      query: ({ page }) => ({
        url: "/employer",
        method: "GET",
        params: { page },
      }),
      keepUnusedDataFor: 5,
      providesTags: (result) =>
        result
          ? [
              ...result.jobs.map(({ _id }) => ({
                type: "EmployerJobs" as const,
                id: _id,
              })),
              { type: "EmployerJobs", id: "LIST" },
            ]
          : [{ type: "EmployerJobs", id: "LIST" }],
    }),

    deleteEmployerJob: builder.mutation<void, { jobId: string }>({
      query: ({ jobId }) => ({
        method: "DELETE",
        url: `/${jobId}`,
      }),
      invalidatesTags: [{ type: "EmployerJobs", id: "LIST" }],
    }),
  }),
});

export const { useGetEmployerJobsQuery, useDeleteEmployerJobMutation } =
  employerJobsApi;

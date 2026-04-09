import { FilterData } from "@/shared/types/filtersJob";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { FilterJobQueryArgs } from "./jobsApi.types";
import { JobData } from "@/shared/types/jobDetail";

export const jobsApi = createApi({
  reducerPath: "jobsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/jobs`,
  }),
  endpoints: (builder) => ({
    getJobs: builder.query<FilterData, { page: number }>({
      query: ({ page }) => ({
        method: "GET",
        url: `/?page=${page}`,
      }),
    }),

    getJob: builder.query<{ job: JobData }, string>({
      query: (jobId) => ({
        method: "GET",
        url: `/${jobId}`,
        credentials: "include",
      }),
    }),

    filterJob: builder.query<FilterData, FilterJobQueryArgs>({
      query: ({
        page,
        perPage,
        sort,
        jobTitle,
        location,
        workType,
        experience,
        careerLevel,
      }) => ({
        method: "POST",
        url: `/filter?page=${page}&perPage=${perPage}&sort=${sort}`,
        body: {
          jobTitle,
          location,
          workType,
          experience,
          careerLevel,
        },
      }),
    }),
  }),
});

export const { useGetJobsQuery, useGetJobQuery, useLazyFilterJobQuery } =
  jobsApi;

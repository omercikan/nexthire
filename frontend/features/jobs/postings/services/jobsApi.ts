import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface JobResults {
  currentCounts: number;
  totalCounts: number;
  jobs: {
    _id: string;
    jobTitle: string;
    careerLevel: string;
    category: string;
    workType: string;
    employerId: {
      _id: string;
      companyLogo: string;
      companyName: string;
    };
  }[];
}

export const jobsApi = createApi({
  reducerPath: "jobsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/jobs`,
  }),
  endpoints: (builder) => ({
    getJobs: builder.query<JobResults, { page: number }>({
      query: ({ page }) => ({
        method: "GET",
        url: `/?page=${page}`,
      }),
    }),
  }),
});

export const { useGetJobsQuery, useLazyGetJobsQuery } = jobsApi;

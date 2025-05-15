import { Employer } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const featuredJobs = createApi({
  reducerPath: "featuredJobs2",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/firebase/employers/",
  }),
  endpoints: (builder) => ({
    getFeaturedJobs: builder.query<
      { employers: Employer[]; status: number },
      string
    >({
      query: () => "featured",
    }),
  }),
});

export const { useGetFeaturedJobsQuery } = featuredJobs;

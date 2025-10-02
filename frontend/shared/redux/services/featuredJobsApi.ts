import { Employer } from "@/shared/types/models/employer";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const featuredJobsApi = createApi({
  reducerPath: "featuredJobsApi",
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

export const { useGetFeaturedJobsQuery } = featuredJobsApi;

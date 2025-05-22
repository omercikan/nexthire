import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const jobPostings = createApi({
  reducerPath: "postingJobs",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/firebase/",
  }),
  endpoints: (builder) => ({
    getJobPostings: builder.query({
      query: () => ({
        url: "job-postings?sort=undefined&start=0&end=9",
        method: "POST",
        body: JSON.stringify({
          modeOfWork: "",
          experienceTime: [],
          positionLevel: [],
        }),
      }),
    }),
  }),
});

export const { useGetJobPostingsQuery } = jobPostings;

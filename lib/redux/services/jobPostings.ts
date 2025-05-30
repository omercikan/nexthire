import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const jobPostings = createApi({
  reducerPath: "postingJobs",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/firebase/",
  }),
  endpoints: (builder) => ({
    getJobPostings: builder.query({
      query: () => ({
        url: "job-postings?sort=asc&start=0&end=9",
        method: "POST",
        body: {
          modeOfWork: "",
          experienceTime: [],
          positionLevel: [],
          jobKeywords: [],
          locationKeywords: [],
        },
      }),
    }),

    filterJobPostings: builder.mutation({
      query: ({
        sort = "",
        start = "0",
        end = "9",
        modeOfWork = "",
        experienceTime = [],
        positionLevel = [],
        jobKeywords = [],
        locationKeywords = [],
      }) => ({
        url: `job-postings?sort=${sort}&start=${start}&end=${end}`,
        method: "POST",
        body: JSON.stringify({
          modeOfWork,
          experienceTime,
          positionLevel,
          jobKeywords,
          locationKeywords,
        }),
      }),
    }),
  }),
});

export const { useGetJobPostingsQuery, useFilterJobPostingsMutation } =
  jobPostings;

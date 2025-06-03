import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const jobPostings = createApi({
  reducerPath: "postingJobs",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/firebase/",
  }),
  endpoints: (builder) => ({
    getJobPostings: builder.query({
      query: () => ({
        url: "job-postings?sort=undefined&start=0&end=10",
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
        sort = "asc",
        start,
        end,
        modeOfWork = "",
        experienceTime = [],
        positionLevel = [],
        jobKeywords = [],
        locationKeywords = [],
        pageValue = "",
      }) => ({
        url: `job-postings?sort=${sort}&start=${start}&end=${end}`,
        method: "POST",
        body: JSON.stringify({
          modeOfWork,
          experienceTime,
          positionLevel,
          jobKeywords,
          locationKeywords,
          pageValue,
        }),
      }),
    }),
  }),
});

export const { useGetJobPostingsQuery, useFilterJobPostingsMutation } =
  jobPostings;

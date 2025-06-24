import { EmployerOpenJobs } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const jobDetailApi = createApi({
  reducerPath: "jobDetailApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/firebase/",
  }),
  endpoints: (builder) => ({
    getJobDetail: builder.query<
      { job: EmployerOpenJobs; status: number },
      { postID: string }
    >({
      query: ({ postID }) => ({
        url: "job-detail",
        method: "POST",
        body: {
          postID,
        },
      }),
    }),
  }),
});

export const { useGetJobDetailQuery } = jobDetailApi;

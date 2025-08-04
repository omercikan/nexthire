import { EmployerOpenJobs } from "@/types/auth/employer/open-jobs.types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const jobDetailApi = createApi({
  reducerPath: "jobDetailApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/firebase/",
  }),
  endpoints: (builder) => ({
    getJobDetail: builder.query<
      {
        job: EmployerOpenJobs & {
          companyLogo: string;
          companyName: string;
          serviceArea: string;
          companyId: string;
          numberOfEmployees: string;
        };
        status: number;
      },
      { postID: string; companyID: string }
    >({
      query: ({ postID, companyID }) => ({
        url: "job-detail",
        method: "POST",
        body: {
          postID,
          companyID,
        },
      }),
    }),
  }),
});

export const { useGetJobDetailQuery } = jobDetailApi;

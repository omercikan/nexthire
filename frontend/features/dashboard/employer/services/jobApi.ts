import { JobData } from "@/shared/types/jobDetail";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const jobApi = createApi({
  reducerPath: "jobApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/employer`,
  }),
  endpoints: (builder) => ({
    publishJob: builder.mutation<JobData, { data: Partial<JobData>; jobId?: string }>({
      query: ({ data, jobId }) => ({
        url: jobId ? `/publish-job?jobId=${jobId}` : "/publish-job",
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
  }),
});

export const { usePublishJobMutation } = jobApi;

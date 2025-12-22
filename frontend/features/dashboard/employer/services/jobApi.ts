import { Job } from "@/shared/types/employer/open-jobs.types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const jobApi = createApi({
  reducerPath: "jobApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/employer`,
  }),
  endpoints: (builder) => ({
    createJob: builder.mutation<Job, Partial<Job>>({
      query: (data) => ({
        url: "/create-job",
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
  }),
});

export const { useCreateJobMutation } = jobApi;

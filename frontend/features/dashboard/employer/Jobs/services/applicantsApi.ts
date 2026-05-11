import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Applicant } from "../JobApplicationsDrawer/types/applicantTypes";

export const applicantsApi = createApi({
  reducerPath: "applicantsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/employer/jobs`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getApplicants: builder.query<
      {
        success: boolean;
        count: number;
        data: Applicant[];
        hasNextPage: boolean;
      },
      { jobId: string; page: number; search?: string; status?: string }
    >({
      query: ({ jobId, page, search, status }) => ({
        method: "GET",
        url: `/${jobId}/applicants`,
        params: { page, search, status },
      }),
    }),
  }),
});

export const { useGetApplicantsQuery } = applicantsApi;

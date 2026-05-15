import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Applicant } from "../JobApplicationsDrawer/types/applicantTypes";

export const applicantsApi = createApi({
  reducerPath: "applicantsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/employer/jobs`,
    credentials: "include",
  }),
  tagTypes: ["Applicant"],
  endpoints: (builder) => ({
    getApplicants: builder.query<
      {
        success: boolean;
        count: number;
        data: Applicant[];
        hasNextPage: boolean;
        statusCounts: { count: number; status: string }[];
      },
      { jobId: string; page: number; search?: string; status?: string }
    >({
      query: ({ jobId, page, search, status }) => ({
        method: "GET",
        url: `/${jobId}/applicants`,
        params: { page, search, status },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ candidateId }) => ({
                type: "Applicant" as const,
                id: candidateId,
              })),
              { type: "Applicant", id: "LIST" },
            ]
          : [{ type: "Applicant", id: "LIST" }],
    }),

    updateApplicantStatus: builder.mutation({
      query: ({ jobId, status, candidateId }) => ({
        method: "PATCH",
        url: `/${jobId}/status`,
        body: { status, candidateId },
      }),
      invalidatesTags: (result, error, { candidateId }) => [
        { type: "Applicant", id: candidateId },
      ],
    }),
  }),
});

export const { useGetApplicantsQuery, useUpdateApplicantStatusMutation } =
  applicantsApi;

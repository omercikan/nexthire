import { ApplicationData } from "@/shared/types/jobApplication";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const jobApplicationApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/jobs`,
    credentials: "include",
  }),
  tagTypes: ["applicationId"],
  endpoints: (builder) => ({
    sendApplication: builder.mutation<
      ApplicationData,
      { jobId: string; formData: FormData }
    >({
      query: ({ jobId, formData }) => ({
        url: `/${jobId}/applications`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: (_result, _error, { jobId }) => {
        return [{ type: "applicationId", id: jobId }];
      },
    }),
  }),
});

export const { useSendApplicationMutation } = jobApplicationApi;

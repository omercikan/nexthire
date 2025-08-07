import { ApplicationData } from "@/types/jobApplication";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const jobApplicationApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "/api/firebase/applications/" }),
  tagTypes: ["applicationId"],
  endpoints: (builder) => ({
    sendApplication: builder.mutation<
      { ok: boolean; message: string; code: string },
      { applicationData: ApplicationData }
    >({
      query: ({ applicationData }) => ({
        url: "send-application",
        method: "POST",
        body: { applicationData },
      }),
      invalidatesTags: (_result, _error, { applicationData }) => [
        { type: "applicationId", id: applicationData.postId },
      ],
    }),
    getApplication: builder.query<
      { appliedData: ApplicationData },
      { candidateId: string; postId: string }
    >({
      query: ({ candidateId, postId }) => ({
        url: `get-application?cid=${candidateId}&postId=${postId}`,
        method: "GET",
      }),
      providesTags: (result, _error, { postId }) => {
        return result ? [{ type: "applicationId", id: postId }] : [];
      },
    }),
  }),
});

export const { useSendApplicationMutation, useGetApplicationQuery } =
  jobApplicationApi;

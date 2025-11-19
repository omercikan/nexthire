import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const candidateResumeApi = createApi({
  reducerPath: "candidateResumeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/candidate`,
  }),
  tagTypes: ["Resume"],
  endpoints: (builder) => ({
    uploadResume: builder.mutation({
      query: (data) => ({
        url: "/upload-resume",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Resume"],
    }),

    getResumes: builder.query({
      query: (userId) => ({
        method: "GET",
        url: `/get-resumes/${userId}`,
      }),
      providesTags: ["Resume"],
    }),

    deleteResumes: builder.mutation({
      query: ({ resumeIDs, publicId }) => ({
        method: "DELETE",
        url: "/delete-resumes",
        body: { resumeIDs, publicId },
      }),
      invalidatesTags: ["Resume"],
    }),
  }),
});

export const {
  useUploadResumeMutation,
  useGetResumesQuery,
  useDeleteResumesMutation,
} = candidateResumeApi;

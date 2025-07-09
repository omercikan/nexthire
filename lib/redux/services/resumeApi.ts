import { CVDataFields, UploadedCV } from "@/types/resume";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const resumeApi = createApi({
  reducerPath: "resumeApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/resume/" }),
  tagTypes: ["Resume"],
  endpoints: (builder) => ({
    uploadResume: builder.mutation<{ resumeData: UploadedCV }, FormData>({
      query: (formData) => ({
        url: "upload-resume",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: (_result, _error, formData) => {
        const cvID = formData.get("cvID");
        return [{ type: "Resume", id: String(cvID) as string }];
      },
    }),
    fetchResume: builder.query<
      { resumeData: CVDataFields[] },
      { docID: string; cvID: string }
    >({
      query: ({ docID }) => `fetch-resume/${docID}`,
      providesTags: (_result, _error, { cvID }) => [
        { type: "Resume", id: cvID },
      ],
    }),
  }),
});

export const { useUploadResumeMutation, useFetchResumeQuery } = resumeApi;

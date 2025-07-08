import { UploadedCV } from "@/types/uploadResume";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const uploadResume = createApi({
  reducerPath: "uploadResume",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/" }),
  endpoints: (builder) => ({
    uploadResume: builder.mutation<{ resumeData: UploadedCV }, FormData>({
      query: (formData) => ({
        url: "upload-resume",
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const { useUploadResumeMutation } = uploadResume;

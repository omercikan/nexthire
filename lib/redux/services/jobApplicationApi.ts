import { ApplicationData } from "@/types/jobApplication";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const jobApplicationApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "api/firebase/applications/" }),
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
    }),
  }),
});

export const { useSendApplicationMutation } = jobApplicationApi;

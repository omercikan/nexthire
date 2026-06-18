import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CreateInterviewRequest } from "../types/interview.types";

export const interviewApi = createApi({
  reducerPath: "InterviewApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/employer/interviews`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    createInterview: builder.mutation<unknown, CreateInterviewRequest>({
      query: (data) => ({
        method: "POST",
        url: "/",
        body: data,
      }),
    }),
  }),
});

export const { useCreateInterviewMutation } = interviewApi;

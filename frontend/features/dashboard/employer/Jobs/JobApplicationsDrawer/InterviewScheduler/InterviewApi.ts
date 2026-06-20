import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CreateInterviewRequest } from "../types/interview.types";

export const interviewApi = createApi({
  reducerPath: "InterviewApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/employer/`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    createInterview: builder.mutation<unknown, CreateInterviewRequest>({
      query: (data) => ({
        method: "POST",
        url: "/interviews",
        body: data,
      }),
    }),

    getInterview: builder.query<
      Omit<CreateInterviewRequest, "candidateId"> & { _id: string },
      { interviewId: string }
    >({
      query: ({ interviewId }) => ({
        method: "GET",
        url: `/interview/${interviewId}`,
      }),
    }),
  }),
});

export const { useCreateInterviewMutation, useGetInterviewQuery } =
  interviewApi;

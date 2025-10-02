import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userViewsApi = createApi({
  reducerPath: "userViewsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/dashboard/views" }),
  endpoints: (builder) => ({
    getCandidateProfileViews: builder.query<
      {
        candidateViews: {
          userId: string;
          views: { view: string; month: string }[];
        };
      },
      string
    >({
      query: (userId) => `/get-candidate-views?userId=${userId}`,
    }),
  }),
});

export const { useGetCandidateProfileViewsQuery } = userViewsApi;

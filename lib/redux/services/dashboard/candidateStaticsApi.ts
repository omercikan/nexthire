import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const candidateStaticsApi = createApi({
  reducerPath: "candidateStaticsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/dashboard/" }),
  endpoints: (builder) => ({
    getUserStatics: builder.query<
      {
        appliedJobCount: string;
        message: string;
      },
      { candidateId: string }
    >({
      query: ({ candidateId }) => ({
        method: "GET",
        url: `get-user-statics?candidateId=${candidateId}`,
      }),
    }),
  }),
});

export const { useGetUserStaticsQuery } = candidateStaticsApi;

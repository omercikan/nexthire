import { Employer } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const bestCompaniesApi = createApi({
  reducerPath: "bestCompaniesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/firebase/",
  }),
  endpoints: (builder) => ({
    getBestCompanies: builder.query<
      { employers: Employer[]; status: number },
      void
    >({
      query: () => "employers/bestCompany",
      keepUnusedDataFor: 300,
    }),
  }),
});

export const { useGetBestCompaniesQuery } = bestCompaniesApi;

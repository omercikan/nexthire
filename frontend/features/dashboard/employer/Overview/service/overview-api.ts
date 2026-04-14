import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { EmployerOverviewResponse } from "../types";

export const overviewApi = createApi({
  reducerPath: "employerOverviewApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/employer`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getEmployerOverview: builder.query<EmployerOverviewResponse, void>({
      query: () => ({
        url: "/overview",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetEmployerOverviewQuery } = overviewApi;

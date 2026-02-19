import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const EmployerProfileAPI = createApi({
  reducerPath: "EmployerProfileAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/employer`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    updateProfile: builder.mutation({
      query: (data) => ({
        method: "PUT",
        url: "/profile",
        body: data,
      }),
    }),
  }),
});

export const { useUpdateProfileMutation } = EmployerProfileAPI;

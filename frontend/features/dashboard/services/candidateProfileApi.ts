import { Candidate } from "@/shared/types/models/candidate";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const candidateProfileApi = createApi({
  reducerPath: "candidateProfileApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/candidate`,
  }),
  endpoints: (builder) => ({
    updateProfile: builder.mutation<Candidate, FormData>({
      query: (data) => ({
        method: "PUT",
        url: `/update-profile`,
        body: data,
      }),
    }),
  }),
});

export const { useUpdateProfileMutation } = candidateProfileApi;

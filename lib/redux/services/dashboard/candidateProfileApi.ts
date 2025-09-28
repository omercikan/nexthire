import { CandidateForm } from "@/app/(dashboard)/pages/Profile/ProfileForm/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const candidateProfileApi = createApi({
  reducerPath: "candidateProfileApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/dashboard/update-candidate-profile/",
  }),
  endpoints: (builder) => ({
    updateProfile: builder.mutation<
      { message: string },
      { userId: string; data: CandidateForm & { dateOfBirth: Date } }
    >({
      query: ({ userId, data }) => ({
        method: "POST",
        url: `${userId}`,
        body: data,
      }),
    }),
  }),
});

export const { useUpdateProfileMutation } = candidateProfileApi;

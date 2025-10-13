import { User } from "@/shared/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authServiceApi = createApi({
  reducerPath: "authServiceApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/`,
    credentials: "include",
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    createCandidate: builder.mutation<
      { message: string },
      { fullname: string; email: string; password: string }
    >({
      query: ({ fullname, email, password }) => ({
        method: "POST",
        url: "auth/register-candidate",
        body: { fullname, email, password },
      }),
      invalidatesTags: ["User"],
    }),

    loginCandidate: builder.mutation<
      { message: string },
      { email: string; password: string }
    >({
      query: ({ email, password }) => ({
        method: "POST",
        url: "auth/login-candidate",
        body: { email, password },
      }),
      invalidatesTags: ["User"],
    }),

    getUser: builder.query<User, void>({
      query: () => ({
        method: "GET",
        url: `users/me`,
      }),
      providesTags: ["User"],
    }),
  }),
});

export const {
  useCreateCandidateMutation,
  useLoginCandidateMutation,
  useGetUserQuery,
} = authServiceApi;

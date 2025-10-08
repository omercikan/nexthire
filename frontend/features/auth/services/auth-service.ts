import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authServiceApi = createApi({
  reducerPath: "authServiceApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/auth`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    createCandidate: builder.mutation<
      { message: string },
      { fullname: string; email: string; password: string }
    >({
      query: ({ fullname, email, password }) => ({
        method: "POST",
        url: "/register-candidate",
        body: { fullname, email, password },
      }),
    }),

    loginCandidate: builder.mutation<
      { message: string },
      { email: string; password: string }
    >({
      query: ({ email, password }) => ({
        method: "POST",
        url: "/login-candidate",
        body: { email, password },
      }),
    }),
  }),
});

export const { useCreateCandidateMutation, useLoginCandidateMutation } =
  authServiceApi;

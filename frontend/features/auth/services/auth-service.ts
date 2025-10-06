import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authServiceApi = createApi({
  reducerPath: "authServiceApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/auth`,
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
        credentials: "include",
      }),
    }),
  }),
});

export const { useCreateCandidateMutation } = authServiceApi;

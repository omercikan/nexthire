import { User } from "@/shared/types";
import { Employer } from "@/shared/types/models/employer";
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

    getUser: builder.query<User, string>({
      query: () => ({
        method: "GET",
        url: `users/me`,
      }),
      providesTags: ["User"],
    }),

    createEmployer: builder.mutation<
      Employer,
      Omit<
        Employer,
        | "createdAt"
        | "updatedAt"
        | "_id"
        | "companyLogo"
        | "emailVerified"
        | "role"
      >
    >({
      query: (data) => ({
        url: "auth/register-employer",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    loginEmployer: builder.mutation<
      { message: string },
      { email: string; password: string }
    >({
      query: ({ email, password }) => ({
        method: "POST",
        url: "auth/login-employer",
        body: { email, password },
      }),
      invalidatesTags: ["User"],
    }),

    verifyOtp: builder.mutation<
      { message: string; status: boolean },
      { token: string; code: string }
    >({
      query: ({ token, code }) => ({
        url: "/auth/otp",
        method: "POST",
        body: { token, code },
      }),
    }),

    refreshOtp: builder.mutation<
      { message: string; status: boolean; email: string },
      { token: string }
    >({
      query: ({ token }) => ({
        method: "PATCH",
        url: "/auth/otp/refresh",
        body: { token },
      }),
    }),

    resetPassword: builder.mutation<
      { message: string; status: number; role: "employer" | "candidate" },
      {
        token?: string;
        userId?: string;
        role?: string;
        oldPassword?: string;
        newPassword: string;
      }
    >({
      query: ({ token, userId, role, oldPassword, newPassword }) => ({
        method: "PATCH",
        url: "auth/password",
        body: { token, userId, role, oldPassword, newPassword },
      }),
    }),

    sendResetEmail: builder.mutation<{ message: string }, { email: string }>({
      query: ({ email }) => ({
        url: "auth/email/send-otp",
        method: "POST",
        body: { email },
      }),
    }),
  }),
});

export const {
  useCreateCandidateMutation,
  useLoginCandidateMutation,
  useCreateEmployerMutation,
  useGetUserQuery,
  useVerifyOtpMutation,
  useRefreshOtpMutation,
  useResetPasswordMutation,
  useSendResetEmailMutation,
  useLoginEmployerMutation,
} = authServiceApi;

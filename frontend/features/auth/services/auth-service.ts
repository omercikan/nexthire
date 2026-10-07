import { baseApi } from "@/shared/api/baseApi";
import { User } from "@/shared/types";
import { Result } from "@/shared/types/api/apiResponse";
import { RegisterEmployerReqeust } from "@/shared/types/api/registerEmployer";

export const authServiceApi = baseApi.injectEndpoints({
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
      Result<{ status: string; identityId: string }>,
      RegisterEmployerReqeust
    >({
      query: (data) => ({
        url: "/auth/register/employer",
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
      { message: string; status: string },
      { token: string; code: string }
    >({
      query: ({ token, code }) => ({
        url: "/otp/verify-otp",
        method: "POST",
        body: { resetToken: token, code },
      }),
    }),

    refreshOtp: builder.mutation<
      Result<{ status: string }>,
      { resetToken: string }
    >({
      query: ({ resetToken }) => ({
        method: "POST",
        url: "/otp/refresh",
        body: { resetToken },
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

    sendResetEmail: builder.mutation<{ resetToken: string }, { email: string }>(
      {
        query: ({ email }) => ({
          url: "/otp/forgot-password",
          method: "POST",
          body: { email },
        }),
      },
    ),
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

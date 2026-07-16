import { baisApi } from '../baisapi';

export const authApi = baisApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    getProfile: builder.query({
      query: () => '/auth/me',
      providesTags: ['Profile'],
    }),
    register: builder.mutation({
      query: (userData) => ({
        url: '/auth/register',
        method: 'POST',
        body: userData,
      }),
    }),
    requestMagicLink: builder.mutation({
      query: (emailData) => ({
        url: '/auth/magic-link/request',
        method: 'POST',
        body: emailData,
      }),
    }),
    verifyMagicLink: builder.query({
      query: (token) => `/auth/magic-link/verify?token=${token}`,
    }),
    requestOtp: builder.mutation({
      query: (emailData) => ({
        url: '/auth/otp/request',
        method: 'POST',
        body: emailData,
      }),
    }),
    verifyOtp: builder.mutation({
      query: (otpData) => ({
        url: '/auth/otp/verify',
        method: 'POST',
        body: otpData,
      }),
    }),
    registerPasskeyOptions: builder.mutation({
      query: (emailData) => ({
        url: '/auth/passkey/register/options',
        method: 'POST',
        body: emailData,
      }),
    }),
    registerPasskeyVerify: builder.mutation({
      query: (verifyData) => ({
        url: '/auth/passkey/register/verify',
        method: 'POST',
        body: verifyData,
      }),
    }),
    loginPasskeyOptions: builder.mutation({
      query: (emailData) => ({
        url: '/auth/passkey/login/options',
        method: 'POST',
        body: emailData,
      }),
    }),
    loginPasskeyVerify: builder.mutation({
      query: (verifyData) => ({
        url: '/auth/passkey/login/verify',
        method: 'POST',
        body: verifyData,
      }),
    }),
    refreshToken: builder.mutation({
      query: (refreshData) => ({
        url: '/auth/refresh',
        method: 'POST',
        body: refreshData,
      }),
    }),
    logout: builder.mutation({
      query: (refreshData) => ({
        url: '/auth/logout',
        method: 'POST',
        body: refreshData,
      }),
    }),
    requestPasswordReset: builder.mutation({
      query: (emailData) => ({
        url: '/auth/password-reset/request',
        method: 'POST',
        body: emailData,
      }),
    }),
    verifyPasswordReset: builder.mutation({
      query: (resetData) => ({
        url: '/auth/password-reset/verify',
        method: 'POST',
        body: resetData,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useLoginMutation,
  useGetProfileQuery,
  useRegisterMutation,
  useRequestMagicLinkMutation,
  useVerifyMagicLinkQuery,
  useRequestOtpMutation,
  useVerifyOtpMutation,
  useRegisterPasskeyOptionsMutation,
  useRegisterPasskeyVerifyMutation,
  useLoginPasskeyOptionsMutation,
  useLoginPasskeyVerifyMutation,
  useRefreshTokenMutation,
  useLogoutMutation,
  useRequestPasswordResetMutation,
  useVerifyPasswordResetMutation,
} = authApi;

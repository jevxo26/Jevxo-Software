import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001',
    prepareHeaders: (headers, { getState }) => {
      // Get the token from state
      const token = (getState() as any).auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Client', 'Profile', 'Role', 'User', 'Website'],
  endpoints: (builder) => ({
    // Auth endpoints
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

    // User Management endpoints
    getUsers: builder.query({
      query: () => '/users',
      providesTags: ['User'],
      transformResponse: (response: any) => response?.data || response || [],
    }),
    createUser: builder.mutation({
      query: (newUser) => ({
        url: '/users',
        method: 'POST',
        body: newUser,
      }),
      invalidatesTags: ['User'],
    }),
    updateUser: builder.mutation({
      query: ({ id, ...patches }) => ({
        url: `/users/${id}`,
        method: 'PATCH',
        body: patches,
      }),
      invalidatesTags: ['User'],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),

    // Role Management endpoints
    getRoles: builder.query({
      query: () => '/roles',
      providesTags: ['Role'],
    }),
    createRole: builder.mutation({
      query: (newRole) => ({
        url: '/roles',
        method: 'POST',
        body: newRole,
      }),
      invalidatesTags: ['Role'],
    }),
    assignPermissionsToRole: builder.mutation({
      query: ({ id, permissionIds }) => ({
        url: `/roles/${id}/permissions`,
        method: 'POST',
        body: { permissionIds },
      }),
      invalidatesTags: ['Role'],
    }),
    assignRoleToUser: builder.mutation({
      query: ({ userId, roleId }) => ({
        url: `/roles/users/${userId}/assign`,
        method: 'POST',
        body: { roleId },
      }),
      invalidatesTags: ['User'],
    }),

    // Client endpoints
    getClients: builder.query({
      query: () => '/client',
      providesTags: ['Client'],
      transformResponse: (response: any) => {
        const rawList = Array.isArray(response) ? response : (response?.data || []);
        return rawList.map((c: any) => ({
          id: c.id,
          name: c.companyName || 'Unknown Corp',
          website: c.websites?.[0]?.domain || c.email || 'No Website',
          plan: c.subscriptions?.[0]?.planName || 'Growth',
          country: c.addresses?.[0]?.country || 'USA/BD',
          status: c.status === 'ACTIVE' ? 'Active' : c.status === 'SUSPENDED' ? 'Suspended' : c.status,
        }));
      },
    }),
    createClient: builder.mutation({
      query: (newClient) => ({
        url: '/client',
        method: 'POST',
        body: newClient,
      }),
      invalidatesTags: ['Client'],
    }),
    updateClient: builder.mutation({
      query: ({ id, ...patches }) => ({
        url: `/client/${id}`,
        method: 'PATCH',
        body: patches,
      }),
      invalidatesTags: ['Client'],
    }),
    deleteClient: builder.mutation({
      query: (id) => ({
        url: `/client/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Client'],
    }),

    // Website endpoints
    getWebsites: builder.query({
      query: () => '/websites',
      providesTags: ['Website'],
      transformResponse: (response: any) => response?.data || response || [],
    }),
    getWebsiteById: builder.query({
      query: (id) => `/websites/${id}`,
      providesTags: ['Website'],
    }),
    createWebsite: builder.mutation({
      query: (newWebsite) => ({
        url: '/websites',
        method: 'POST',
        body: newWebsite,
      }),
      invalidatesTags: ['Website'],
    }),
    updateWebsite: builder.mutation({
      query: ({ id, ...patches }) => ({
        url: `/websites/${id}`,
        method: 'PATCH',
        body: patches,
      }),
      invalidatesTags: ['Website'],
    }),
    deleteWebsite: builder.mutation({
      query: (id) => ({
        url: `/websites/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Website'],
    }),
  }),
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
  useGetUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetRolesQuery,
  useCreateRoleMutation,
  useAssignPermissionsToRoleMutation,
  useAssignRoleToUserMutation,
  useGetClientsQuery,
  useCreateClientMutation,
  useUpdateClientMutation,
  useDeleteClientMutation,
  useGetWebsitesQuery,
  useGetWebsiteByIdQuery,
  useCreateWebsiteMutation,
  useUpdateWebsiteMutation,
  useDeleteWebsiteMutation,
} = apiSlice;

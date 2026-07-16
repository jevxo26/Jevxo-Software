import { baisApi } from '../baisapi';

export const userApi = baisApi.injectEndpoints({
  endpoints: (builder) => ({
    // User Management endpoints
    getUsers: builder.query({
      query: () => '/users',
      providesTags: ['User'],
      transformResponse: (response: any) => response?.data || response || [],
    }),
    getUserById: builder.query({
      query: (id) => `/users/${id}`,
      providesTags: ['User'],
      transformResponse: (response: any) => response?.data || response || null,
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
    getClientById: builder.query({
      query: (id) => `/client/${id}`,
      providesTags: ['Client'],
      transformResponse: (response: any) => response?.data || response || null,
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
      transformResponse: (response: any) => response?.data || response || null,
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
  overrideExisting: false,
});

export const {
  // User Management
  useGetUsersQuery,
  useGetUserByIdQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  // Client Management
  useGetClientsQuery,
  useGetClientByIdQuery,
  useCreateClientMutation,
  useUpdateClientMutation,
  useDeleteClientMutation,
  // Website Management
  useGetWebsitesQuery,
  useGetWebsiteByIdQuery,
  useCreateWebsiteMutation,
  useUpdateWebsiteMutation,
  useDeleteWebsiteMutation,
} = userApi;

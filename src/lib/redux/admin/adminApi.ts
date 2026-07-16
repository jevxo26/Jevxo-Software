import { baisApi } from '../baisapi';

export const adminApi = baisApi.injectEndpoints({
  endpoints: (builder) => ({
    // Role Management endpoints
    getRoles: builder.query({
      query: () => '/roles',
      providesTags: ['Role'],
    }),
    getRoleById: builder.query({
      query: (id) => `/roles/${id}`,
      providesTags: ['Role'],
      transformResponse: (response: any) => response?.data || response || null,
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

    // Subscription endpoints
    getSubscriptions: builder.query({
      query: () => '/subscripsion',
      providesTags: ['Subscription'],
      transformResponse: (response: any) => response?.data || response || [],
    }),
    getSubscriptionById: builder.query({
      query: (id) => `/subscripsion/${id}`,
      providesTags: ['Subscription'],
      transformResponse: (response: any) => response?.data || response || null,
    }),
    createSubscription: builder.mutation({
      query: (newSubscription) => ({
        url: '/subscripsion',
        method: 'POST',
        body: newSubscription,
      }),
      invalidatesTags: ['Subscription'],
    }),
    updateSubscription: builder.mutation({
      query: ({ id, ...patches }) => ({
        url: `/subscripsion/${id}`,
        method: 'PATCH',
        body: patches,
      }),
      invalidatesTags: ['Subscription'],
    }),
    deleteSubscription: builder.mutation({
      query: (id) => ({
        url: `/subscripsion/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Subscription'],
    }),
    toggleSubscriptionAutoRenew: builder.mutation({
      query: ({ id, autoRenew }) => ({
        url: `/subscripsion/${id}/toggle-auto-renew`,
        method: 'PATCH',
        body: { autoRenew },
      }),
      invalidatesTags: ['Subscription'],
    }),
    processSubscriptionRenewal: builder.mutation({
      query: (id) => ({
        url: `/subscripsion/${id}/process-renewal`,
        method: 'POST',
      }),
      invalidatesTags: ['Subscription'],
    }),

    // Plan endpoints
    getPlans: builder.query({
      query: () => '/plan',
      providesTags: ['Plan'],
      transformResponse: (response: any) => response?.data || response || [],
    }),
    getPlanById: builder.query({
      query: (id) => `/plan/${id}`,
      providesTags: ['Plan'],
      transformResponse: (response: any) => response?.data || response || null,
    }),
    createPlan: builder.mutation({
      query: (newPlan) => ({
        url: '/plan',
        method: 'POST',
        body: newPlan,
      }),
      invalidatesTags: ['Plan'],
    }),
    updatePlan: builder.mutation({
      query: ({ id, ...patches }) => ({
        url: `/plan/${id}`,
        method: 'PATCH',
        body: patches,
      }),
      invalidatesTags: ['Plan'],
    }),
    deletePlan: builder.mutation({
      query: (id) => ({
        url: `/plan/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Plan'],
    }),

    // Promo Code endpoints
    getPromoCodes: builder.query({
      query: () => '/promo-code',
      providesTags: ['PromoCode'],
      transformResponse: (response: any) => response?.data || response || [],
    }),
    getPromoCodeById: builder.query({
      query: (id) => `/promo-code/${id}`,
      providesTags: ['PromoCode'],
      transformResponse: (response: any) => response?.data || response || null,
    }),
    createPromoCode: builder.mutation({
      query: (newPromoCode) => ({
        url: '/promo-code',
        method: 'POST',
        body: newPromoCode,
      }),
      invalidatesTags: ['PromoCode'],
    }),
    updatePromoCode: builder.mutation({
      query: ({ id, ...patches }) => ({
        url: `/promo-code/${id}`,
        method: 'PATCH',
        body: patches,
      }),
      invalidatesTags: ['PromoCode'],
    }),
    deletePromoCode: builder.mutation({
      query: (id) => ({
        url: `/promo-code/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['PromoCode'],
    }),

    // Coupon endpoints
    getCoupons: builder.query({
      query: () => '/coupon',
      providesTags: ['Coupon'],
      transformResponse: (response: any) => response?.data || response || [],
    }),
    getCouponById: builder.query({
      query: (id) => `/coupon/${id}`,
      providesTags: ['Coupon'],
      transformResponse: (response: any) => response?.data || response || null,
    }),
    createCoupon: builder.mutation({
      query: (newCoupon) => ({
        url: '/coupon',
        method: 'POST',
        body: newCoupon,
      }),
      invalidatesTags: ['Coupon'],
    }),
    updateCoupon: builder.mutation({
      query: ({ id, ...patches }) => ({
        url: `/coupon/${id}`,
        method: 'PATCH',
        body: patches,
      }),
      invalidatesTags: ['Coupon'],
    }),
    deleteCoupon: builder.mutation({
      query: (id) => ({
        url: `/coupon/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Coupon'],
    }),

    // Modules endpoints
    getModules: builder.query({
      query: () => '/modules',
      providesTags: ['Module'],
      transformResponse: (response: any) => response?.data || response || [],
    }),

    // Permissions endpoints
    getPermissions: builder.query({
      query: () => '/permissions',
      providesTags: ['Permission'],
      transformResponse: (response: any) => response?.data || response || [],
    }),
    getPermissionById: builder.query({
      query: (id) => `/permissions/${id}`,
      providesTags: ['Permission'],
      transformResponse: (response: any) => response?.data || response || null,
    }),
    createPermission: builder.mutation({
      query: (newPermission) => ({
        url: '/permissions',
        method: 'POST',
        body: newPermission,
      }),
      invalidatesTags: ['Permission'],
    }),
    updatePermission: builder.mutation({
      query: ({ id, ...patches }) => ({
        url: `/permissions/${id}`,
        method: 'PUT',
        body: patches,
      }),
      invalidatesTags: ['Permission'],
    }),
    deletePermission: builder.mutation({
      query: (id) => ({
        url: `/permissions/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Permission'],
    }),

    // Permission Logs endpoints
    getPermissionLogs: builder.query({
      query: () => '/permission-logs',
      providesTags: ['PermissionLog'],
      transformResponse: (response: any) => response?.data || response || [],
    }),
    getPermissionLogById: builder.query({
      query: (id) => `/permission-logs/${id}`,
      providesTags: ['PermissionLog'],
      transformResponse: (response: any) => response?.data || response || null,
    }),
  }),
  overrideExisting: false,
});

export const {
  // Role Management
  useGetRolesQuery,
  useGetRoleByIdQuery,
  useCreateRoleMutation,
  useAssignPermissionsToRoleMutation,
  useAssignRoleToUserMutation,
  // Subscription System
  useGetSubscriptionsQuery,
  useGetSubscriptionByIdQuery,
  useCreateSubscriptionMutation,
  useUpdateSubscriptionMutation,
  useDeleteSubscriptionMutation,
  useToggleSubscriptionAutoRenewMutation,
  useProcessSubscriptionRenewalMutation,
  // Plan Management
  useGetPlansQuery,
  useGetPlanByIdQuery,
  useCreatePlanMutation,
  useUpdatePlanMutation,
  useDeletePlanMutation,
  // Promo Code Management
  useGetPromoCodesQuery,
  useGetPromoCodeByIdQuery,
  useCreatePromoCodeMutation,
  useUpdatePromoCodeMutation,
  useDeletePromoCodeMutation,
  // Coupon Management
  useGetCouponsQuery,
  useGetCouponByIdQuery,
  useCreateCouponMutation,
  useUpdateCouponMutation,
  useDeleteCouponMutation,
  // Modules System
  useGetModulesQuery,
  // Permissions System
  useGetPermissionsQuery,
  useGetPermissionByIdQuery,
  useCreatePermissionMutation,
  useUpdatePermissionMutation,
  useDeletePermissionMutation,
  // Permission Logs System
  useGetPermissionLogsQuery,
  useGetPermissionLogByIdQuery,
} = adminApi;

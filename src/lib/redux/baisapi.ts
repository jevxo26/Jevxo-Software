import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baisApi = createApi({
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
    tagTypes: [
        'Client',
        'Profile',
        'Role',
        'User',
        'Website',
        'Subscription',
        'Plan',
        'PromoCode',
        'Coupon',
        'Permission',
        'Module',
        'PermissionLog',
    ],
    endpoints: () => ({}),
});



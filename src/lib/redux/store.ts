import { configureStore } from '@reduxjs/toolkit';
import { baisApi } from './baisapi';
import authReducer from './slices/authSlice';

export const store = configureStore({
  reducer: {
    [baisApi.reducerPath]: baisApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baisApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

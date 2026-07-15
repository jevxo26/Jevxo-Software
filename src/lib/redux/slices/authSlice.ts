import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  token: string | null;
  user: any | null;
  role: string | null;
}

const getInitialState = (): AuthState => {
  if (typeof window !== 'undefined') {
    try {
      const token = localStorage.getItem('jevxo_token');
      const userStr = localStorage.getItem('jevxo_user');
      const role = localStorage.getItem('jevxo_last_role') || localStorage.getItem('jevxo_role');
      const user = userStr ? JSON.parse(userStr) : null;
      return {
        token,
        user,
        role,
      };
    } catch (e) {
      console.error('Failed to parse initial auth state', e);
    }
  }
  return {
    token: null,
    user: null,
    role: null,
  };
};

const authSlice = createSlice({
  name: 'auth',
  initialState: getInitialState(),
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ token: string; user: any; role: string }>
    ) => {
      const { token, user, role } = action.payload;
      state.token = token;
      state.user = user;
      state.role = role;

      if (typeof window !== 'undefined') {
        localStorage.setItem('jevxo_token', token);
        localStorage.setItem('jevxo_user', JSON.stringify(user));
        localStorage.setItem('jevxo_role', role);
        localStorage.setItem('jevxo_last_role', role);
        // Sync with dashboard compatibility
        localStorage.setItem('jevxo_user_profile', JSON.stringify({
          name: user.name || 'User',
          avatarEmoji: '👨‍💻',
        }));
      }
    },
    logOut: (state) => {
      state.token = null;
      state.user = null;
      state.role = null;

      if (typeof window !== 'undefined') {
        localStorage.removeItem('jevxo_token');
        localStorage.removeItem('jevxo_user');
        localStorage.removeItem('jevxo_role');
        localStorage.removeItem('jevxo_user_profile');
      }
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;
export default authSlice.reducer;

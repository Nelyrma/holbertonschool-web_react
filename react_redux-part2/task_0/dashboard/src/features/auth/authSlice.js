import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {
    email: '',
  },
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user.email = action.payload.email;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.user.email = '';
      state.isLoggedIn = false;
    }
  }
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;

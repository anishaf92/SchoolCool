

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  admin: null,
  token: null,
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    loginAdmin: (state, action) => {
      state.admin = action.payload.adminData;
      state.token = action.payload.token;
    },
    logoutAdmin: (state) => {
      state.admin = null;
      state.token = null;
    },
  },
});

export const { loginAdmin, logoutAdmin } = adminSlice.actions;
export default adminSlice.reducer;

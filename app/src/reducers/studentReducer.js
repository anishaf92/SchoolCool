// studentSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  student: null,
  token: null,
};

const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    loginStudent: (state, action) => {
      state.student = action.payload.studentData;
      state.token = action.payload.token;
    },
    logoutStudent: (state) => {
      state.student = null;
      state.token = null;
    },
  },
});

export const { loginStudent, logoutStudent } = studentSlice.actions;
export default studentSlice.reducer;

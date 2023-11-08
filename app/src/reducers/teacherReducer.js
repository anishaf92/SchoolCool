import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  teacher: null,
  token: null,
  verified: false
};

const teacherSlice = createSlice({
  name: 'teacher',
  initialState,
  reducers: {
    loginTeacher: (state, action) => {
      state.teacher = action.payload.teacherData;
      state.token = action.payload.token;
    },
    updateTeacher: (state,action) => {
        state.teacher = action.payload.teacherData;

    },
    logoutTeacher: (state) => {
      state.teacher = null;
      state.token = null;
    },
    
  },
});

export const { loginTeacher, updateTeacher, logoutTeacher } = teacherSlice.actions;
export default teacherSlice.reducer;

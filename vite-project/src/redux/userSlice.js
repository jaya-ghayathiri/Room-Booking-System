import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    token: null,
    role: 'user' // Ensure 'role' is used here
  },
  reducers: {
    setToken(state, action) {
      state.token = action.payload.token; // Use token from payload
      state.role = action.payload.role; // Use role from payload
    },
    removeToken(state) {
      state.token = null;
      state.role = 'user'; // Reset role
    }
  }
});

export const { setToken, removeToken } = userSlice.actions;
export default userSlice.reducer;

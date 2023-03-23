import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    username: '',
  },
  reducers: {
    setName: (state, action) => {
      state.username = action.payload;
    },
  },
});

export const { setName } = userSlice.actions;

export default userSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    username: '',
  },
  reducers: {
    setUserVal: (state, action) => {
      if (action.payload?.key) {
        state[action.payload.key as keyof typeof state] = action.payload.value;
      }
    },
  },
});

export const { setUserVal } = userSlice.actions;

export default userSlice.reducer;

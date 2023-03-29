import { createSlice } from '@reduxjs/toolkit';

export const breadCrumbSlice = createSlice({
  name: 'breadCrumb',
  initialState: {
    items: [{ title: 'Home' }, { title: 'Identity' }],
  },
  reducers: {
    setBreadCrumb: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { setBreadCrumb } = breadCrumbSlice.actions;

export default breadCrumbSlice.reducer;

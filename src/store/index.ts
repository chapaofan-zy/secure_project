import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userReducer from './slices/user.slice';
import breadCrumbReducer from './slices/breadCrumb.slice';

export const store = configureStore({
  reducer: {
    users: userReducer,
    breadCrumb: breadCrumbReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

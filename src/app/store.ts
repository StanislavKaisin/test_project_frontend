import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import messageReducer from "../redux/messageSlice";
import loaderReducer from "../redux/loaderSlice";
import userReducer from "../redux/userSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    message: messageReducer,
    loader: loaderReducer,
    user: userReducer,
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

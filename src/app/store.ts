import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import alertReducer from "../redux/alertSlice";
import loaderReducer from "../redux/loaderSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    alert: alertReducer,
    loader: loaderReducer,
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

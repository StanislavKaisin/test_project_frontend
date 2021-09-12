import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

export interface IAlert {
  value: {
    snackbarOpen: boolean;
    snackbarType: "success" | "info" | "warning" | "error";
    snackbarMessage: string;
  };
}

const initialState: IAlert = {
  value: {
    snackbarOpen: false,
    snackbarType: "error",
    snackbarMessage: "",
  },
};

export const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    setAlert: (state, action) => {
      state.value = action.payload;
    },
    unSetAlert: (state) => {
      state.value.snackbarOpen = false;
    },
  },
});

export const { setAlert, unSetAlert } = alertSlice.actions;

export const selectAlert = (state: RootState) => state.alert.value;

export default alertSlice.reducer;

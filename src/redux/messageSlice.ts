import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

export interface IMessage {
  value: {
    snackbarOpen: boolean;
    snackbarType: "success" | "info" | "warning" | "error";
    snackbarMessage: string;
  };
}

const initialState: IMessage = {
  value: {
    snackbarOpen: false,
    snackbarType: "error",
    snackbarMessage: "",
  },
};

export const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setMessage: (state, action) => {
      state.value = action.payload;
    },
    unSetMessage: (state) => {
      state.value.snackbarOpen = false;
    },
  },
});

export const { setMessage, unSetMessage } = messageSlice.actions;

export const selectMessage = (state: RootState) => state.message.value;

export default messageSlice.reducer;

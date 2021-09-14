import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

export interface ILoader {
  value: {
    loading: boolean;
  };
}

const initialState: ILoader = {
  value: {
    loading: false,
  },
};

export const loaderSlice = createSlice({
  name: "loader",
  initialState,
  reducers: {
    setLoader: (state) => {
      state.value.loading = true;
    },
    unSetLoader: (state) => {
      state.value.loading = false;
    },
  },
});

export const { setLoader, unSetLoader } = loaderSlice.actions;

export const selectAlert = (state: RootState) => state.alert.value;

export default loaderSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../api/api.config";
import { setMessage } from "./messageSlice";
import { setLoader, unSetLoader } from "./loaderSlice";
const axios = require("axios").default;

export interface IUser {
  _id?: string;
  access_token?: string;
  name: string;
  email: string;
  password?: string;
  phone: string;
  viber: string;
  address: string;
  alerts?: any[];
  comments?: any[];
}

export interface IUserData {
  access_token?: string;
  name: string;
  email: string;
  password?: string;
  phone: string;
  viber: string;
  address: string;
  alerts?: any[];
  comments?: any[];
}
export interface IUserCreateResponse {
  _id: string;
  access_token: string;
  name: string;
  email: string;
  password?: string;
  phone: string;
  viber: string;
  address: string;
  alerts?: any[];
  comments?: any[];
}

export interface IUserAction {
  type: string;
  payload: IUserCreateResponse;
}

const initialState: IUser = {
  access_token: "",
  name: "",
  email: "",
  password: "",
  phone: "",
  viber: "",
  address: "",
};

export const signinUser = createAsyncThunk(
  "user/signinUser",
  async function (user: any, { rejectWithValue, dispatch }) {
    try {
      dispatch(setLoader());
      const response = await axios.post(`${BASE_URL}/auth/login`, user);
      const userFromDb = response.data;
      dispatch(setCurrentUser(userFromDb));
      dispatch(unSetLoader());
      dispatch(
        setMessage({
          snackbarOpen: true,
          snackbarType: "success",
          snackbarMessage: "You successfully logged in!",
        })
      );
    } catch (error: any) {
      if (error instanceof Error) {
        dispatch(
          setMessage({
            snackbarOpen: true,
            snackbarType: "error",
            snackbarMessage: error?.message,
          })
        );
        dispatch(unSetLoader());
      }
    }
  }
);

export const addNewUser = createAsyncThunk(
  "user/addNewUser",
  async function (user: any, { rejectWithValue, dispatch }) {
    try {
      dispatch(setLoader());
      const response = await axios.post(`${BASE_URL}/users`, user);
      const userFromDb = response.data;
      dispatch(setCurrentUser(userFromDb));
      dispatch(unSetLoader());
      dispatch(
        setMessage({
          snackbarOpen: true,
          snackbarType: "success",
          snackbarMessage: "You successfully logged in!",
        })
      );
      dispatch(unSetLoader());
      dispatch(
        setMessage({
          snackbarOpen: true,
          snackbarType: "success",
          snackbarMessage: "User successfully created!",
        })
      );
    } catch (error: any) {
      if (error instanceof Error) {
        dispatch(
          setMessage({
            snackbarOpen: true,
            snackbarType: "error",
            snackbarMessage: error?.message,
          })
        );
        dispatch(unSetLoader());
      }
    }
  }
);

interface IUserUpdate {
  id: string;
  user: any;
}

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async function (updateData: IUserUpdate, { rejectWithValue, dispatch }) {
    try {
      dispatch(setLoader());
      const response = await axios.patch(
        `${BASE_URL}/users/${updateData.id}`,
        updateData.user
      );
      const userFromDb = response.data;
      dispatch(setCurrentUser(userFromDb));
      dispatch(unSetLoader());
      dispatch(
        setMessage({
          snackbarOpen: true,
          snackbarType: "success",
          snackbarMessage: "User successfully updated!",
        })
      );
    } catch (error) {
      if (error instanceof Error) {
        dispatch(
          setMessage({
            snackbarOpen: true,
            snackbarType: "error",
            snackbarMessage: error?.message,
          })
        );
        dispatch(unSetLoader());
      }
    }
  }
);

export const logout = (user: IUserCreateResponse) => {
  return unSetCurrentUser(user);
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUser(state, action: IUserAction) {
      state._id = action.payload._id;
      state.access_token = action.payload.access_token;
      state.address = action.payload.address;
      state.alerts = action.payload.alerts;
      state.comments = action.payload.comments;
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.phone = action.payload.phone;
      state.viber = action.payload.viber;
    },
    unSetCurrentUser(state, action: IUserAction) {
      state._id = "";
      state.access_token = "";
      state.address = initialState.address;
      state.alerts = initialState.alerts;
      state.comments = initialState.comments;
      state.email = initialState.email;
      state.name = initialState.name;
      state.phone = initialState.phone;
      state.viber = initialState.viber;
    },
  },
});

const { setCurrentUser, unSetCurrentUser } = userSlice.actions;
export const userActions = userSlice.actions;

export default userSlice.reducer;

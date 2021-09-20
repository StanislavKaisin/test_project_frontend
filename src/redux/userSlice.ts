import {
  createAsyncThunk,
  createSlice,
  getDefaultMiddleware,
  Middleware,
  PayloadAction,
} from "@reduxjs/toolkit";
import { BASE_URL } from "../api/api.config";
import { useAppDispatch } from "../app/hooks";
import { RootState } from "../app/store";
import { setMessage } from "./messageSlice";
import { setLoader, unSetLoader } from "./loaderSlice";
import { authMiddleware } from "./middleware/authMiddleware";

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
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (!response.ok) {
        let errorMessage = await response.json();
        throw new Error(errorMessage.message);
      }
      const userFromDb = await response.json();
      dispatch(setCurrentUser(userFromDb));
      dispatch(unSetLoader());
      dispatch(
        setMessage({
          snackbarOpen: true,
          snackbarType: "success",
          snackbarMessage: "You successfully logged in!",
        })
      );
    } catch (error) {
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
);

export const addNewUser = createAsyncThunk(
  "user/addNewUser",
  async function (user: any, { rejectWithValue, dispatch }) {
    try {
      dispatch(setLoader());

      const response = await fetch(`${BASE_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        let errorMessage = await response.json();
        throw new Error(errorMessage.message);
      }
      dispatch(unSetLoader());
      dispatch(
        setMessage({
          snackbarOpen: true,
          snackbarType: "success",
          snackbarMessage: "User successfully created!",
        })
      );
    } catch (error) {
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
);

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
    unSetCurrentUser(state, action) {
      state = initialState;
    },
  },
});

const { setCurrentUser, unSetCurrentUser } = userSlice.actions;
export const userActions = userSlice.actions;

export default userSlice.reducer;

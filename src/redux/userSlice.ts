import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { string } from "joi";
import { BASE_URL } from "../api/api.config";
import { useAppDispatch } from "../app/hooks";
import { RootState } from "../app/store";
import { setMessage } from "./messageSlice";
import { setLoader, unSetLoader } from "./loaderSlice";
import { useHistory } from "react-router-dom";

export interface IUser {
  userId: string;
  token: string;
  userData?: IUserData;
}

export interface IUserData {
  name: string;
  email: string;
  password?: string;
  phone: string;
  viber: string;
  address: string;
}
export interface IUserCreateResponse {
  token: string;
  _id: string;
  name: string;
  email: string;
  password?: string;
  phone: string;
  viber: string;
  address: string;
}

export interface IUserAction {
  type: string;
  payload: {
    _id: string;
    token: string;
    userData?: IUserData;
  };
}

const initialState: IUser = {
  userId: "",
  token: "",
  // userData: null,
};

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
      const data = (await response.json()) as IUserCreateResponse;
      console.log("data :>> ", data);
      const { password, ...rest } = data;
      const { _id, token, ...userData } = rest;
      console.log("password :>> ", password);
      const currentUser: IUser = {
        userId: _id,
        token,
        userData: { ...userData },
      };

      dispatch(setCurrentUser(currentUser));
      dispatch(unSetLoader());
      dispatch(
        setMessage({
          snackbarOpen: true,
          snackbarType: "success",
          snackbarMessage: "User successfully created!",
        })
      );
    } catch (error) {
      // return rejectWithValue(error.message);
      // console.log("error :>> ", JSON.stringify(error));
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
    setCurrentUser(state, action) {
      state = action.payload;
    },
    unSetCurrentUser(state, action) {
      state = initialState;
    },
  },
});

const { setCurrentUser, unSetCurrentUser } = userSlice.actions;

export default userSlice.reducer;

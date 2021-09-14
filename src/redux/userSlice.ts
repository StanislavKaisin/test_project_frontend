import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { string } from "joi";
import { BASE_URL } from "../api/api.config";
import { useAppDispatch } from "../app/hooks";
import { RootState } from "../app/store";
import { setAlert } from "./alertSlice";
import { setLoader } from "./loaderSlice";

export interface IUser {
  value: {
    userId: string;
    token: string;
    status: null | string;
    error: null | string;
  };
}

export interface IUserAction {
  type: string;
  payload: {
    _id: string;
    token: string;
  };
}

const initialState: IUser = {
  value: {
    userId: "",
    token: "",
    status: null,
    error: null,
  },
};

const dispatch = useAppDispatch();

export const addNewUser = createAsyncThunk(
  "user/addNewUser",
  async function (user, { rejectWithValue, dispatch }) {
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
        throw new Error("Can't add task. Server error.");
      }

      const data = await response.json();
      dispatch(setCurrentUser(data));
    } catch (error) {
      // return rejectWithValue(error.message);
      dispatch(setAlert(error));
    }
  }
);

// const setError = (state: typeof initialState, action: any) => {
//   state.status = "rejected";
//   state.error = action.payload;
// };

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUser(state, action) {
      state.value = action.payload;
    },
    unSetCurrentUser(state, action) {
      state = initialState;
    },
  },
  /*
  extraReducers: (builder) => {
    builder.addCase(addNewUser.pending, (state, action) => {
      state.value.status = "loading";
    });
    builder.addCase(addNewUser.fulfilled, (state, action) => {
      state.value.token = action.payload.token;
      state.value.userId = action.payload._id;
    });
    // [addNewUser.pending]: (state: typeof initialState) => {
    //   state.value.status = "loading";
    //   state.value.error = null;
    // },
    // [addNewUser.fulfilled]: (state: typeof initialState, action: any) => {
    //   state.value.status = "resolved";
    //   state.value.token = action.payload.token;
    //   state.value.userId = action.payload._id;
    // },
    // [addNewUser.rejected]: setError,
  },
  */
});

const { setCurrentUser, unSetCurrentUser } = userSlice.actions;

export default userSlice.reducer;

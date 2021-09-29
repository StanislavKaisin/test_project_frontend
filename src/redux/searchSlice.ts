import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../api/api.config";
import { IAlertProps } from "../pages/AlertPage";
import { setLoader, unSetLoader } from "./loaderSlice";
import { setMessage } from "./messageSlice";

interface ISearchAlertResponse {
  docs: IAlertProps[];
  hasNextPage: boolean;
  hasPrevPage: boolean;
  limit: number;
  nextPage: null | true;
  page: number;
  pagingCounter: number;
  prevPage: null | true;
  totalDocs: number;
  totalPages: number;
}

export interface ISearchAction {
  type: string;
  payload: ISearch;
}

export interface ISearch {
  query: string;
  results: null | ISearchAlertResponse;
}

const initialState: ISearch = {
  query: "",
  results: null,
};

interface IfetchAlerts {
  alert: string;
  pageNumber?: number | 1;
}

export const fetchSearchResults = createAsyncThunk(
  "search/addSearchResults",
  async function (query: IfetchAlerts, { rejectWithValue, dispatch }) {
    dispatch(setLoader());
    try {
      const response = await fetch(
        `${BASE_URL}/alerts/search?query=${query.alert}&page=${
          query.pageNumber ? query.pageNumber : 1
        }`
      );
      if (!response.ok) {
        let errorMessage = await response.json();
        throw new Error(errorMessage.message);
      }
      const alertFromDbs = await response.json();
      dispatch(setSearch({ query: query.alert, results: alertFromDbs }));
      dispatch(unSetLoader());
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

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearch: (state, action: ISearchAction) => {
      state.query = action.payload.query;
      state.results = action.payload.results;
    },
  },
});

const { setSearch } = searchSlice.actions;
export const searchActions = searchSlice.actions;

export default searchSlice.reducer;

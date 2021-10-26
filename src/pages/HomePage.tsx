import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import SearchIcon from "@material-ui/icons/Search";

import { getAlerts } from "../api/alert";
import { useAppDispatch } from "../app/hooks";
import { AlertsList } from "../components/AlertsList";
import { setLoader, unSetLoader } from "../redux/loaderSlice";
import { setMessage } from "../redux/messageSlice";
import { IAlertProps } from "./AlertPage";
import { useHistory } from "react-router";
import { fetchSearchResults } from "../redux/searchSlice";

export const HomePage = () => {
  const dispatch = useAppDispatch();
  const searchField = useRef<HTMLInputElement>();
  const [search, setsearch] = useState("");
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const history = useHistory();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setsearch(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    dispatch(setLoader());
    event.preventDefault();
    const alert = searchField.current?.value ? searchField.current?.value : "";
    dispatch(fetchSearchResults({ alert }));
    searchField.current!.value = "";
    history.push("results");
  };

  const [alerts, setAlerts] = useState<null | IAlertProps[]>(null);
  useEffect(() => {
    dispatch(setLoader());
    getAlerts()
      .then((data) => {
        setAlerts(data);
        dispatch(unSetLoader());
      })
      .catch((error: any) => {
        let errorMessage;
        if (error.response) {
          errorMessage = error.response.data.message;
        }
        dispatch(
          setMessage({
            snackbarOpen: true,
            snackbarType: "error",
            snackbarMessage: errorMessage ? errorMessage : error?.message,
          })
        );
        dispatch(unSetLoader());
      })
      .finally(() => {
        dispatch(unSetLoader());
      });
  }, []);
  return (
    <div>
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{
          mt: 1,
          display: "flex",
          flexDirection: matches ? "row" : "column",
        }}
      >
        <TextField
          onChange={handleChange}
          inputRef={searchField}
          margin="normal"
          fullWidth
          id="alert"
          label="Search alert"
          name="alert"
          autoFocus
          sx={{
            mt: 1,
            mb: 1,
            mr: 1,
            flexGrow: 1,
            width: matches ? "75%" : "100%",
          }}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 1, mb: 1, flexShrink: 1, width: matches ? "25%" : "100%" }}
          startIcon={<SearchIcon fontSize="large" />}
        >
          Search
        </Button>
      </Box>
      {alerts && <AlertsList data={alerts} />}
    </div>
  );
};

import { TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { getAlerts } from "../api/alert";
import { useAppDispatch } from "../app/hooks";
import { AlertsList } from "../components/AlertsList";
import { setLoader, unSetLoader } from "../redux/loaderSlice";
import { setMessage } from "../redux/messageSlice";
import { IAlertProps } from "./AlertPage";

export const HomePage = () => {
  const dispatch = useAppDispatch();
  const [alerts, setAlerts] = useState<null | IAlertProps[]>(null);
  useEffect(() => {
    dispatch(setLoader());
    getAlerts()
      .then((data) => {
        setAlerts(data);
        dispatch(unSetLoader());
      })
      .catch((error) => {
        dispatch(
          setMessage({
            snackbarOpen: true,
            snackbarType: "error",
            snackbarMessage: error.message,
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
      Home Page
      <TextField fullWidth label="Search alert" id="fullWidth" />
      {alerts && <AlertsList cards={alerts} />}
    </div>
  );
};

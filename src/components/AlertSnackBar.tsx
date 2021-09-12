import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../app/hooks";
import { selectAlert, unSetAlert } from "../redux/alertSlice";
import { Alert } from "@material-ui/core";

export function AlertSnackBar() {
  const dispatch = useDispatch();
  const snackbarOpen = useAppSelector(selectAlert).snackbarOpen;
  const snackbarType = useAppSelector(selectAlert).snackbarType;
  const snackbarMessage = useAppSelector(selectAlert).snackbarMessage;
  const handleClose = (event: React.SyntheticEvent<Element, Event>) => {
    dispatch(unSetAlert());
  };

  return (
    <div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert
          elevation={6}
          variant="filled"
          onClose={handleClose}
          color={snackbarType}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

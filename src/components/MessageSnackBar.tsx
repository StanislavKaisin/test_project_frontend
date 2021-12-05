import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../app/hooks";
import { selectMessage, unSetMessage } from "../redux/messageSlice";
import { Alert } from "@material-ui/core";

export function MessageSnackBar() {
  const dispatch = useDispatch();
  const snackbarOpen = useAppSelector(selectMessage).snackbarOpen;
  const snackbarType = useAppSelector(selectMessage).snackbarType;
  const snackbarMessage = useAppSelector(selectMessage).snackbarMessage;
  const handleClose = () => {
    dispatch(unSetMessage());
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

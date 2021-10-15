import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setLoader, unSetLoader } from "../redux/loaderSlice";
import { createComment } from "../api/comment";
import { RootState } from "../app/store";
import { useHistory } from "react-router";
import { setMessage } from "../redux/messageSlice";
import { addCommentSchema } from "../validation/addCommentSchema";

interface IAddCommentProps {
  cb: () => void;
}

export default function AddComment(props: IAddCommentProps) {
  const [open, setOpen] = React.useState(false);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: RootState) => state.user);
  const history = useHistory();
  // @ts-ignore
  const alert = history.location.pathname.split("/").at(-1);
  const handleClickOpen = () => {
    if (!user.access_token) {
      dispatch(
        setMessage({
          snackbarOpen: true,
          snackbarType: "warning",
          snackbarMessage: "Please sign in to create alert!",
        })
      );
      return;
    }
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleAddComment = async () => {
    try {
      const comment = document.getElementById("name");
      const commentText = (comment as HTMLInputElement).value;
      const commentToDb = {
        owner: user._id!,
        alert: alert,
        description: commentText,
      };
      //validate comment
      const { error } = addCommentSchema.validate(commentToDb, {
        errors: {
          wrap: {
            label: "",
          },
        },
      });
      if (error) {
        dispatch(
          setMessage({
            snackbarOpen: true,
            snackbarType: "error",
            snackbarMessage: error.details[0].message,
          })
        );
      } else {
        dispatch(setLoader());
        await createComment(commentToDb).then(() => {
          dispatch(
            setMessage({
              snackbarOpen: true,
              snackbarType: "success",
              snackbarMessage: "Cooment is published!",
            })
          );
          dispatch(unSetLoader());
          props.cb();
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        dispatch(unSetLoader());
        dispatch(
          setMessage({
            snackbarOpen: true,
            snackbarType: "error",
            snackbarMessage: error.message,
          })
        );
      }
    }
    setOpen(false);
  };

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen} fullWidth>
        Add a comment
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth="xs">
        <DialogTitle>Add a comment</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Add a comment"
            multiline
            rows={4}
            fullWidth
            sx={{ minWidth: { sx: "", sm: "320px" } }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddComment}>Add</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

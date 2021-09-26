import React, { SyntheticEvent, useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  createTheme,
  CssBaseline,
  Grid,
  TextField,
  ThemeProvider,
  Typography,
} from "@material-ui/core";
import { styled } from "@mui/material/styles";
import { MessageSnackBar } from "../components/MessageSnackBar";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setMessage } from "../redux/messageSlice";
import { addAlertSchema } from "../validation/addAlertSchema";
import { RootState } from "../app/store";
import { setLoader, unSetLoader } from "../redux/loaderSlice";
import { createAlert } from "../api/alert";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { useHistory } from "react-router";

const theme = createTheme();
const Input = styled("input")({
  display: "none",
});

export const Alert = () => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state: RootState) => state.user._id);
  const userPhone = useAppSelector((state: RootState) => state.user.phone);
  const [file, setfile] = useState<File | null>(null);
  const history = useHistory();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!userId) {
      dispatch(
        setMessage({
          snackbarOpen: true,
          snackbarType: "error",
          snackbarMessage: "Please sign in to create alert!",
        })
      );
    }
    const data = new FormData(event.currentTarget);
    data.append("file", file as Blob);
    data.append("owner", userId as string);

    const alert = {
      title: data.get("title"),
      description: data.get("description"),
      phone: data.get("phone"),
      viber: data.get("viber"),
      address: data.get("address"),
      owner: userId,
      file: file,
    };

    // validate alert as data is not an object
    const { error } = addAlertSchema.validate(alert, {
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
      try {
        const result = await createAlert(data);
        if (!result) {
          throw new Error("Error posting alert!");
        }
        dispatch(unSetLoader());
        history.push(`/alert/${result._id}`);
        dispatch(
          setMessage({
            snackbarOpen: true,
            snackbarType: "success",
            snackbarMessage: "Alerted succesfully.",
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
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Alert!
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="title"
                  required
                  fullWidth
                  id="title"
                  label="Title"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="description"
                  label="Description"
                  name="description"
                  multiline
                  rows={4}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="phone"
                  label="Phone"
                  type="phone"
                  id="phone"
                  autoComplete="phone"
                  defaultValue={userPhone ? userPhone : ""}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="viber"
                  label="Viber"
                  type="phone"
                  id="viber"
                  autoComplete="phone"
                  defaultValue={userPhone ? userPhone : ""}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="address"
                  label="Address"
                  type="address"
                  id="address"
                  autoComplete="address"
                />
              </Grid>
              <Grid item xs={12}>
                <label htmlFor="file">
                  <Input
                    accept="image/*"
                    id="file"
                    type="file"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      if (
                        event.currentTarget.files &&
                        event.currentTarget.files.length
                      ) {
                        setfile(event.currentTarget.files[0]);
                      }
                    }}
                  />
                  <Button
                    component="span"
                    fullWidth
                    variant="outlined"
                    startIcon={<PhotoCamera />}
                  >
                    Upload
                  </Button>
                </label>
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Alert!
            </Button>
          </Box>
        </Box>
        <MessageSnackBar />
      </Container>
    </ThemeProvider>
  );
};

// eslint-disable-next-line no-console

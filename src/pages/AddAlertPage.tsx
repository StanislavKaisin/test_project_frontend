import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Container,
  createTheme,
  CssBaseline,
  FormControlLabel,
  Grid,
  TextField,
  ThemeProvider,
  Typography,
  useTheme,
} from "@material-ui/core";
import { styled } from "@mui/material/styles";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import { MessageSnackBar } from "../components/MessageSnackBar";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setMessage } from "../redux/messageSlice";
import { addAlertSchema } from "../validation/addAlertSchema";
import { RootState } from "../app/store";
import { setLoader, unSetLoader } from "../redux/loaderSlice";
import { createAlert } from "../api/alert";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { useHistory } from "react-router";

import styles from "../components/PhoneField.module.css";

import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { PhoneLabel } from "../components/PhoneLabel";

const theme = createTheme();
const Input = styled("input")({
  display: "none",
});

export const AddAlertPage = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: RootState) => state.user);
  const userId = useAppSelector((state: RootState) => state.user._id);
  const userPhone = useAppSelector((state: RootState) => state.user.phone);
  const [file, setfile] = useState<File | null>(null);
  const [fileUploadedLabel, setfileUploadedLabel] = useState<string | null>(
    null
  );
  const history = useHistory();

  useEffect(() => {
    if (!user.access_token) {
      dispatch(
        setMessage({
          snackbarOpen: true,
          snackbarType: "warning",
          snackbarMessage: "Please sign in to add alert",
        })
      );
      history.push("user/signin");
    }
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
      searchForOwner: data.get("searchForOwner"),
    };
    const searchForOwnerCheckbox = document.getElementById("searchForOwner");
    alert.searchForOwner = (searchForOwnerCheckbox as HTMLInputElement)
      .checked as any;

    // validate alert as data is not an object
    const { error } = addAlertSchema.validate(alert, {
      errors: {
        wrap: {
          label: "",
        },
      },
    });

    data.set("title", (alert.title as string).trim());
    data.set("description", (alert.description as string).trim());
    data.set("phone", (alert.phone as string).trim());
    data.set("viber", (alert.viber as string).trim());
    data.set("address", (alert.address as string).trim());
    data.set("searchForOwner", alert.searchForOwner as any);

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
      } catch (error: any) {
        let errorMessage;
        if (error.response) {
          errorMessage = error.response.data.message;
        }
        if (error instanceof Error) {
          dispatch(
            setMessage({
              snackbarOpen: true,
              snackbarType: "error",
              snackbarMessage: errorMessage ? errorMessage : error?.message,
            })
          );
          dispatch(unSetLoader());
        }
      }
    }
  };

  const checkboxLabel = {
    inputProps: { "aria-label": "Searching For Owner!" },
  };
  const theme = useTheme();

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
            Alert it!
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
                <PhoneLabel label="Phone*" />
                <PhoneInput
                  onChange={() => {}}
                  placeholder="Viber"
                  value={userPhone ? userPhone : ""}
                  name="phone"
                  label="Phone"
                  type="phone"
                  id="phone"
                  autoComplete="phone"
                  required
                  limitMaxLength
                  className={styles.MyPhoneInput}
                />
              </Grid>
              <Grid item xs={12}>
                <PhoneLabel label="Viber" />
                <PhoneInput
                  onChange={() => {}}
                  placeholder="Viber"
                  value={userPhone ? userPhone : ""}
                  name="viber"
                  label="Viber"
                  type="phone"
                  id="viber"
                  autoComplete="phone"
                  required
                  limitMaxLength
                  className={styles.MyPhoneInput}
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
                        setfileUploadedLabel(event.currentTarget.value);
                      }
                    }}
                  />
                  <Button
                    component="span"
                    fullWidth
                    variant="outlined"
                    startIcon={<PhotoCamera />}
                  >
                    {fileUploadedLabel ? fileUploadedLabel : "Upload"}
                  </Button>
                </label>
              </Grid>
              <Grid item container xs={12} justifyContent="center">
                <FormControlLabel
                  control={
                    <Checkbox
                      name="searchForOwner"
                      id="searchForOwner"
                      {...checkboxLabel}
                      icon={<FavoriteBorder />}
                      checkedIcon={<Favorite />}
                      inputProps={{ "aria-label": "controlled" }}
                      sx={{
                        color: theme.palette.error.light,
                        "&.Mui-checked": {
                          color: theme.palette.error.light,
                        },
                      }}
                    />
                  }
                  label="Searching For Owner!"
                  labelPlacement="end"
                  sx={{
                    color: theme.palette.error.light,
                    alignContent: "center",
                  }}
                />
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

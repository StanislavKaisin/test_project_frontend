import React from "react";
import {
  Avatar,
  Box,
  Button,
  Container,
  createTheme,
  CssBaseline,
  Grid,
  Link,
  TextField,
  ThemeProvider,
  Typography,
} from "@material-ui/core";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { MessageSnackBar } from "../components/MessageSnackBar";
import { useAppDispatch } from "../app/hooks";
import { createUserSchema } from "../validation/createUserSchema";
import { setMessage } from "../redux/messageSlice";
import { addNewUser } from "../redux/userSlice";

const theme = createTheme();

export const Alert = () => {
  const dispatch = useAppDispatch();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const user = {
      name: data.get("name"),
      email: data.get("email"),
      password: data.get("password"),
      phone: data.get("phone"),
      viber: data.get("viber"),
      address: data.get("address"),
    };
    // eslint-disable-next-line no-console

    const { error } = createUserSchema.validate(user, {
      errors: {
        wrap: {
          label: "",
        },
      },
    });
    // console.log("error=", error);
    if (error) {
      dispatch(
        setMessage({
          snackbarOpen: true,
          snackbarType: "error",
          snackbarMessage: error.details[0].message,
        })
      );
    } else {
      dispatch(addNewUser(user));
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
            Create alert!
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
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Create alert!
            </Button>
          </Box>
        </Box>
        <MessageSnackBar />
      </Container>
    </ThemeProvider>
  );
};

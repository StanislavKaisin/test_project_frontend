import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { signinUserSchema } from "../validation/signinUserSchema";
import { setMessage } from "../redux/messageSlice";
import { useDispatch } from "react-redux";
import { signinUser } from "../redux/userSlice";
import { useHistory } from "react-router";
import { useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";
import { useEffect } from "react";

const theme = createTheme();

export default function UserSignIn() {
  const dispatch = useDispatch();
  const history = useHistory();
  const userFromStore = useAppSelector((state: RootState) => state.user);

  useEffect(() => {
    try {
      localStorage.setItem("Pet!Alert", JSON.stringify(userFromStore));
    } catch (error) {
      if (error instanceof Error) {
        dispatch(
          setMessage({
            snackbarOpen: true,
            snackbarType: "error",
            snackbarMessage: error.message,
          })
        );
      }
    }
  }, [userFromStore]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const user = {
      email: (data.get("email") as string).trim(),
      password: (data.get("password") as string).trim(),
    };
    const { error } = signinUserSchema.validate(user, {
      errors: {
        wrap: {
          label: "",
        },
      },
    });
    if (error !== undefined) {
      dispatch(
        setMessage({
          snackbarOpen: true,
          snackbarType: "error",
          snackbarMessage: error.details[0].message,
        })
      );
    } else {
      new Promise<void>(async (resolve, reject) => {
        dispatch(signinUser(user));
        resolve();
      }).then(() => {
        try {
          localStorage.setItem("Pet!Alert", JSON.stringify(userFromStore));
        } catch (error) {
          if (error instanceof Error) {
            dispatch(
              setMessage({
                snackbarOpen: true,
                snackbarType: "error",
                snackbarMessage: error.message,
              })
            );
          }
        }
        history.push("/");
      });
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
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/user/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

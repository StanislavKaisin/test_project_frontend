import React, { useEffect } from "react";
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

const theme = createTheme();

export interface IUserDataFormProps {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  update?: boolean;
  user?: any;
}

export const UserDataForm = (props: IUserDataFormProps) => {
  useEffect(() => {
    if (props.user) {
      const user = props.user;
      const name = document.getElementById("name");
      (name as HTMLInputElement).value = user.name;
      const email = document.getElementById("email");
      (email as HTMLInputElement).value = user.email;
      const phone = document.getElementById("phone");
      (phone as HTMLInputElement).value = user.phone;
      const viber = document.getElementById("viber");
      if (!user.viber) {
        (viber as HTMLInputElement).value = "";
      } else {
        (viber as HTMLInputElement).value = user.viber;
      }
      const address = document.getElementById("address");
      if (!user.address) {
        (address as HTMLInputElement).value = "";
      } else {
        (address as HTMLInputElement).value = user.address;
      }
    }
  });
  const handleSubmit = props.handleSubmit;
  const update = props.update;
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
          {!update && (
            <>
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign up
              </Typography>
            </>
          )}
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              {!update && (
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                  />
                </Grid>
              )}
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
              {update ? `Update personal data` : `Sign Up`}
            </Button>
            {!update && (
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/user/signin" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            )}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

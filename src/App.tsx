import React, { useEffect } from "react";
import { BrowserRouter, Link, Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import { HomePage } from "./pages/HomePage";
import { User } from "./pages/User";
import { Alert } from "./pages/Alert";
import UserSignUp from "./pages/UserSignUp";
import UserSignIn from "./pages/UserSignIn";
import { MessageSnackBar } from "./components/MessageSnackBar";
import Loader from "./components/Loader";
import { makeStyles } from "@material-ui/styles";
import Container from "@mui/material/Container";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { RootState } from "./app/store";
import MenuAppBar from "./components/MenuAppBar";
import { setMessage } from "./redux/messageSlice";
import { userActions } from "./redux/userSlice";
import { AlertPage } from "./pages/AlertPage";

const useStyles = makeStyles(() => ({
  caption: {
    paddingTop: "0.5rem",
    paddingRight: "1rem",
    paddingBottom: "0.5rem",
    paddingLeft: "1rem",
    color: "#fafafa",
  },
}));

function App() {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(
    (state: RootState) => state.loader.value.loading
  );
  useEffect(() => {
    try {
      const userFromStorage = JSON.parse(
        localStorage.getItem("Pet!Alert") as string
      );
      if (userFromStorage) {
        dispatch(userActions.setCurrentUser(userFromStorage));
      }
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
  }, []);
  const styles = useStyles();

  return (
    <>
      <Container maxWidth="lg">
        <MenuAppBar />
      </Container>
      <Container maxWidth="lg">
        <BrowserRouter>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/results">Results</Link>
              </li>
              <li>
                <Link to="/user">User Profile</Link>
              </li>
              <li>
                <Link to="/user/signup">User SignUp</Link>
              </li>
              <li>
                <Link to="/user/signin">User SignIn</Link>
              </li>
              <li>
                <Link to="/alert">Alert</Link>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route exact path="/user">
              <User />
            </Route>
            <Route path="/user/signup">
              <UserSignUp />
            </Route>
            <Route path="/user/signin">
              <UserSignIn />
            </Route>
            <Route exact path="/alert">
              <Alert />
            </Route>
            <Route path="/alert/:alert">
              <AlertPage />
            </Route>
            <Redirect from="/" to="/" />
          </Switch>
        </BrowserRouter>
        {isLoading ? <Loader /> : null}
        <MessageSnackBar />
      </Container>
    </>
  );
}

export default App;

import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Link, Redirect, Route, Switch } from "react-router-dom";
import Container from "@mui/material/Container";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Box from "@mui/material/Box";
import Zoom from "@mui/material/Zoom";
import Fab from "@mui/material/Fab";
import { useTheme, useMediaQuery } from "@material-ui/core";
import UserSignUp from "./pages/UserSignUp";
import UserSignIn from "./pages/UserSignIn";
import MenuAppBar from "./components/MenuAppBar";
import Loader from "./components/Loader";
import { MessageSnackBar } from "./components/MessageSnackBar";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { setMessage } from "./redux/messageSlice";
import { HomePage } from "./pages/HomePage";
import { ResultsPage } from "./pages/ResultsPage";
import { UserPage } from "./pages/UserPage";
import { AddAlertPage } from "./pages/AddAlertPage";
import { AlertPage } from "./pages/AlertPage";
import { RootState } from "./app/store";
import { UserUpdatePage } from "./pages/UserUpdatePage";
import { userActions } from "./redux/userSlice";

interface IScrollTopProps {
  window?: () => Window;
  children?: React.ReactElement;
}

function ScrollTop(props: IScrollTopProps) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const anchor = (
      (event.target as HTMLDivElement).ownerDocument || document
    ).querySelector("#back-to-top-anchor");

    if (anchor) {
      anchor.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  return (
    <Zoom in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: "fixed", bottom: 16, right: 16 }}
      >
        {children}
      </Box>
    </Zoom>
  );
}

function App(props: IScrollTopProps) {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(
    (state: RootState) => state.loader.value.loading
  );
  const userFromStore = useAppSelector((state: RootState) => state.user);
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

  const theme = useTheme();
  const larger = useMediaQuery(theme.breakpoints.down("sm"));
  const arrowSize = larger ? "small" : "large";

  return (
    <>
      <Container maxWidth="lg">
        <MenuAppBar />
      </Container>
      {isLoading ? <Loader /> : null}
      <MessageSnackBar />
      <Container maxWidth="lg" sx={{ mt: 10 }}>
        {/* <TestNavigation /> */}
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/results">
            <ResultsPage />
          </Route>
          <Route exact path="/user">
            <UserPage />
          </Route>
          <Route path="/user/signup">
            <UserSignUp />
          </Route>
          <Route path="/user/signin">
            <UserSignIn />
          </Route>
          <Route path="/user/update">
            <UserUpdatePage />
          </Route>
          <Route exact path="/alert">
            <AddAlertPage />
          </Route>
          <Route path="/alert/:alert">
            <AlertPage />
          </Route>
          <Redirect from="/" to="/" />
        </Switch>
      </Container>
      <ScrollTop {...props}>
        <Fab color="secondary" size={arrowSize} aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </>
  );
}

export default App;

const TestNavigation = () => {
  return (
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
          <Link to="/user/update">User Update</Link>
        </li>
        <li>
          <Link to="/alert">Alert</Link>
        </li>
      </ul>
    </nav>
  );
};

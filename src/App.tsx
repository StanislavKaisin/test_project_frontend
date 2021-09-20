import React, { useEffect } from "react";
import { BrowserRouter, Link, Route } from "react-router-dom";
import "./App.css";
import { HomePage } from "./pages/HomePage";
import { User } from "./pages/User";
import { Alert } from "./pages/Alert";
import UserSignUp from "./pages/UserSignUp";
import UserSignIn from "./pages/UserSignIn";
import { MessageSnackBar } from "./components/MessageSnackBar";
import Loader from "./components/Loader";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { RootState } from "./app/store";
import MenuAppBar from "./components/MenuAppBar";
import { setMessage } from "./redux/messageSlice";
import { userActions } from "./redux/userSlice";

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

  return (
    <>
      <MenuAppBar />
      <BrowserRouter>
        <div>
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

          <Route path="/" exact component={HomePage} />
          <Route path="/user" exact component={User} />
          <Route path="/user/signup" exact component={UserSignUp} />
          <Route path="/user/signin" exact component={UserSignIn} />
          <Route path="/alert" exact component={Alert} />
        </div>
      </BrowserRouter>
      {isLoading ? <Loader /> : null}
      <MessageSnackBar />
    </>
  );
}

export default App;

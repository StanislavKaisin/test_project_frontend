import React from "react";
import { BrowserRouter, Link, Route } from "react-router-dom";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import "./App.css";
import { HomePage } from "./pages/HomePage";
import { User } from "./pages/User";
import { Alert } from "./pages/Alert";
import UserSignUp from "./pages/UserSignUp";
import UserSignIn from "./pages/UserSignIn";
import { MessageSnackBar } from "./components/MessageSnackBar";
import Loader from "./components/Loader";
import { useAppSelector } from "./app/hooks";
import { useSelector } from "react-redux";
import { RootState } from "./app/store";
import MenuAppBar from "./components/MenuAppBar";

function App() {
  const isLoading = useAppSelector(
    (state: RootState) => state.loader.value.loading
  );

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

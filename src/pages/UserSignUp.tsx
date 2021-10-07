import * as React from "react";
import { createTheme } from "@mui/material/styles";
import { createUserSchema } from "../validation/createUserSchema";
import { setMessage } from "../redux/messageSlice";
import { useAppDispatch } from "../app/hooks";
import { addNewUser } from "../redux/userSlice";
import { useHistory } from "react-router";
import { UserDataForm } from "../components/UserDataForm";

const theme = createTheme();

export default function UserSignUp() {
  const dispatch = useAppDispatch();
  const history = useHistory();

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

    if (error) {
      dispatch(
        setMessage({
          snackbarOpen: true,
          snackbarType: "error",
          snackbarMessage: error.details[0].message,
        })
      );
    } else {
      await dispatch(addNewUser(user)).then(() => history.push("/user/signin"));
    }
  };

  return <UserDataForm handleSubmit={handleSubmit} />;
}

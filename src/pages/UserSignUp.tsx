import * as React from "react";
import { createUserSchema } from "../validation/createUserSchema";
import { setMessage } from "../redux/messageSlice";
import { useAppDispatch } from "../app/hooks";
import { addNewUser } from "../redux/userSlice";
import { useHistory } from "react-router";
import { UserDataForm } from "../components/UserDataForm";

export default function UserSignUp() {
  const dispatch = useAppDispatch();
  const history = useHistory();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const user = {
      name: (data.get("name") as string).trim(),
      email: (data.get("email") as string).trim(),
      password: (data.get("password") as string).trim(),
      phone: (data.get("phone") as string).trim(),
      viber: (data.get("viber") as string).trim(),
      address: (data.get("address") as string).trim(),
    };

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

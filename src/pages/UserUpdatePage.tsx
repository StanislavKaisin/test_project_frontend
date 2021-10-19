import React from "react";
import { useHistory } from "react-router";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";
import { UserDataForm } from "../components/UserDataForm";
import { setMessage } from "../redux/messageSlice";
import { addNewUser, updateUser } from "../redux/userSlice";
import { updateUserSchema } from "../validation/updateUserSchema";

export const UserUpdatePage = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const user = useAppSelector((state: RootState) => state.user);
  if (user.name === "") {
    dispatch(
      setMessage({
        snackbarOpen: true,
        snackbarType: "error",
        snackbarMessage: "User not found!",
      })
    );
    history.push("/");
  }
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userToUpdate = {
      name: (data.get("name") as string).trim(),
      email: (data.get("email") as string).trim(),
      // password: (data.get("password") as string)
      //   ? (data.get("password") as string).trim()
      //   : null,
      phone: (data.get("phone") as string).trim(),
      viber: (data.get("viber") as string).trim(),
      address: (data.get("address") as string).trim(),
    };
    const { error } = updateUserSchema.validate(userToUpdate, {
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
      await dispatch(
        updateUser({ id: user._id as string, user: userToUpdate })
      ).then(() => {
        localStorage.setItem("user", JSON.stringify(user));
        history.push("/user");
      });
    }
  };

  return <UserDataForm handleSubmit={handleSubmit} update user={user} />;
};

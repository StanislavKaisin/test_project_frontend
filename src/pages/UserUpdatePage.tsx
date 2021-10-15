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
      name: data.get("name"),
      email: data.get("email"),
      password: data.get("password"),
      phone: data.get("phone"),
      viber: data.get("viber"),
      address: data.get("address"),
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

import React from "react";
import { useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";

export const User = () => {
  const user = useAppSelector((state: RootState) => state.user);

  return (
    <div>
      User Page
      {JSON.stringify(user)}
    </div>
  );
};

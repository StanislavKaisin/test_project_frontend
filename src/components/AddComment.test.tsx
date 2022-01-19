import React, { FormEvent } from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../app/store";
import { BrowserRouter } from "react-router-dom";
import AddComment from "./AddComment";

describe("AddComment", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <AddComment
            cb={function (): void {
              throw new Error("Function not implemented.");
            }}
          />
        </Provider>
      </BrowserRouter>
    );
  });
  it("renders add comment button", () => {
    expect(
      screen.getByRole("button", { name: /Add a comment/i })
    ).toBeInTheDocument();
  });
});

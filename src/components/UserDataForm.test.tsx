import React, { FormEvent } from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../app/store";
import { BrowserRouter } from "react-router-dom";
import { UserDataForm } from "./UserDataForm";

describe("UserDataForm", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <UserDataForm
            handleSubmit={function (
              event: FormEvent<HTMLFormElement>
            ): Promise<void> {
              throw new Error("Function not implemented.");
            }}
          />
        </Provider>
      </BrowserRouter>
    );
  });
  it("should render a form", () => {
    expect(screen.getByTestId("signUpForm")).toBeInTheDocument();
  });
  it("renders page header", () => {
    const header = screen.getByRole("heading", { level: 1 });
    expect(header).toHaveTextContent("Sign up");
  });
  it("renders required name input", () => {
    const element = screen.getByRole("textbox", { name: "Name" });
    expect(element).toBeRequired();
  });
  it("renders required email input", () => {
    const element = screen.getByRole("textbox", { name: "Email Address" });
    expect(element).toBeRequired();
  });
  it("renders required password input", () => {
    const element = screen.getByLabelText(/password/i);
    expect(element).toBeRequired();
  });
  it("renders required phone input", () => {
    expect(screen.getByTestId("phone")).toBeRequired();
  });
  it("renders viber input", () => {
    expect(screen.getByTestId("viber")).toBeInTheDocument();
  });
  it("renders address input", () => {
    const element = screen.getAllByLabelText(/address/i);
    expect(element).not.toBeNull();
  });
  it("renders submit button", () => {
    const element = screen.getByRole("button");
    expect(element).toHaveAttribute("type", "submit");
  });
  it("renders redirect link", () => {
    const element = screen.getByRole("link", {
      name: "Already have an account? Sign in",
    });
    expect(element).toBeInTheDocument();
  });
});

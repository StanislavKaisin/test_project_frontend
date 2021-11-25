import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../app/store";
import UserSignIn from "./UserSignIn";

describe("UserSignIn", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <UserSignIn />
        </Provider>
      </BrowserRouter>
    );
  });
  it("renders page header", () => {
    const header = screen.getByRole("heading", { level: 1 });
    expect(header).toHaveTextContent("Sign in");
  });
  it("renders required email input", () => {
    const element = screen.getByRole("textbox", { name: "Email Address" });
    expect(element).toBeRequired();
  });
  it("renders required password input", () => {
    const element = screen.getByLabelText(/password/i);
    expect(element).toBeRequired();
  });
  it("renders sign in button", () => {
    const element = screen.getByRole("button", { name: /sign in/i });
    expect(element).toBeInTheDocument();
  });
  it("renders sign up link", () => {
    const element = screen.getByRole("link", {
      name: "Don't have an account? Sign Up",
    });
    expect(element).toBeInTheDocument();
  });
});

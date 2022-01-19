import { render, screen } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../app/store";
import { UserPage } from "./UserPage";

describe("UserPage", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <UserPage />
        </Provider>
      </BrowserRouter>
    );
  });
  it("renders page header", () => {
    const element = screen.getByRole("heading", { level: 1 });
    expect(element).toHaveTextContent(/PERSONAL DATA/i);
  });
  it("renders rows with personal data", () => {
    expect(screen.getByText(/Name:/i)).toBeInTheDocument();
    expect(screen.getByText(/E-mail:/i)).toBeInTheDocument();
    expect(screen.getByText(/Phone:/i)).toBeInTheDocument();
    expect(screen.getByText(/Viber:/i)).toBeInTheDocument();
    expect(screen.getByText(/Address:/i)).toBeInTheDocument();
  });
  it("renders change personal data button", () => {
    const element = screen.getByRole("button", {
      name: /change PERSONAL DATA/i,
    });
    expect(element).toBeInTheDocument();
  });
  it("renders logout button", () => {
    const element = screen.getByRole("button", {
      name: /log out/i,
    });
    expect(element).toBeInTheDocument();
  });
  it("renders alerts accordion", () => {
    const element = screen.getByText(/your alerts/i);
    expect(element.parentElement).toHaveClass("MuiAccordionSummary-content");
  });
  it("renders comments accordion", () => {
    const element = screen.getByText(/your comments/i);
    expect(element.parentElement).toHaveClass("MuiAccordionSummary-content");
  });
});

import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../app/store";
import { AddAlertPage } from "./AddAlertPage";
import { BrowserRouter } from "react-router-dom";

describe("AddAlertPage", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <AddAlertPage />
        </Provider>
      </BrowserRouter>
    );
  });

  it("renders form", () => {
    expect(screen.getByTestId("addAlertForm")).toBeInTheDocument();
  });
  it("renders title", () => {
    expect(screen.getByText("Alert it!")).toBeInTheDocument();
  });
  it("renders submit button", () => {
    const { container } = render(
      <BrowserRouter>
        <Provider store={store}>
          <AddAlertPage />
        </Provider>
      </BrowserRouter>
    );
    expect(container.querySelector(`button[type="submit"]`)).not.toBeNull();
  });
  it("title input must be required", () => {
    const { container } = render(
      <BrowserRouter>
        <Provider store={store}>
          <AddAlertPage />
        </Provider>
      </BrowserRouter>
    );
    const element = container.querySelector(`#title`) as HTMLInputElement;
    expect(element).not.toBeNull();
    expect(element.required).toBeTruthy();
  });
  it("description input must be required", () => {
    const { container } = render(
      <BrowserRouter>
        <Provider store={store}>
          <AddAlertPage />
        </Provider>
      </BrowserRouter>
    );
    const element = container.querySelector(`#description`) as HTMLInputElement;
    expect(element).not.toBeNull();
    expect(element.required).toBeTruthy();
  });
  it("phone input must be required", () => {
    const { container } = render(
      <BrowserRouter>
        <Provider store={store}>
          <AddAlertPage />
        </Provider>
      </BrowserRouter>
    );
    const element = container.querySelector(`#phone`) as HTMLInputElement;
    expect(element).not.toBeNull();
    expect(element.required).toBeTruthy();
  });
  it("renders search for owner checkbox", () => {
    expect(
      screen.getAllByText(/Searching For Owner!/i) as HTMLElement[]
    ).not.toBeNull();
  });
  it("renders upload button", () => {
    expect(screen.getByText(/upload/i) as HTMLElement).toBeInTheDocument();
  });
  it("renders checked checbox", () => {
    const { container } = render(
      <BrowserRouter>
        <Provider store={store}>
          <AddAlertPage />
        </Provider>
      </BrowserRouter>
    );
    const checkbox = container.querySelector(
      "#searchForOwner"
    ) as HTMLInputElement;
    expect(checkbox).not.toBeChecked();
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });
});

import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

describe("App", () => {
  beforeAll(() =>
    render(
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    )
  );
  it("renders menu links", () => {
    expect(screen.getByText(/Pet!Alert/i)).toBeInTheDocument();
    expect(screen.getByText(/add alert/i)).toBeInTheDocument();
    expect(screen.getByText(/profile/i)).toBeInTheDocument();
  });
});

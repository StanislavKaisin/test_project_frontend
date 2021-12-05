import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter, Router } from "react-router-dom";
import { store } from "../app/store";
import { AlertPage } from "./AlertPage";
import { createMemoryHistory } from "history";
import { act } from "react-dom/test-utils";

describe("AlertPage", () => {
  beforeEach(() => {
    const history = createMemoryHistory();
    history.push("/alert/1");
    render(
      <Router history={history}>
        <Provider store={store}>
          <AlertPage />
        </Provider>
      </Router>
    );
  });
  it("renders alert title", async () => {
    expect(await screen.findByTestId("title")).toBeInTheDocument();
  });
  it("renders alert photo", async () => {
    expect(await screen.findByRole("img")).toBeInTheDocument();
  });
  it("renders alert description", async () => {
    expect(await screen.findByTestId("description")).toBeInTheDocument();
  });
  it("renders user info", async () => {
    expect(await screen.findByText(/author/i)).toBeInTheDocument();
    expect(await screen.findAllByText(/Viber/i)).toBeTruthy();
    expect(await screen.findAllByText(/phone/i)).toBeTruthy();
    expect(await screen.findByText(/number of views/i)).toBeInTheDocument();
    expect(await screen.findByText(/published/i)).toBeInTheDocument();
  });
  it("renders qr code page", async () => {
    expect(await screen.findByTestId("QRCode")).toBeInTheDocument();
  });

  it("renders print alert button", async () => {
    expect(
      await screen.findByRole("button", { name: /print alert/i })
    ).toBeInTheDocument();
  });
  it("renders add comment button", async () => {
    expect(
      await screen.findByRole("button", { name: /add a comment/i })
    ).toBeInTheDocument();
  });

  it("renders add comment dialog", async () => {
    waitFor(async () => {
      const history = createMemoryHistory();
      history.push("/alert/1");
      const { baseElement } = render(
        <Router history={history}>
          <Provider store={store}>
            <AlertPage />
          </Provider>
        </Router>
      );
    });
  });

  it("renders all data from db", async () => {
    expect(() => screen.getByText("undefined")).toThrow(
      /Unable to find an element with the text: undefined./i
    );
  });
});

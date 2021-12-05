import { fireEvent, render, screen } from "@testing-library/react";
import { HomePage } from "./HomePage";
import { Provider } from "react-redux";
import { store } from "../app/store";

describe("Home page", () => {
  beforeEach(() =>
    render(
      <Provider store={store}>
        <HomePage />
      </Provider>
    )
  );
  it("renders search button", () => {
    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.getByRole("button")).toHaveTextContent(/search/i);
  });
  it("renders input field", async () => {
    const input = (await screen.findByLabelText(
      "Search alert"
    )) as HTMLInputElement;
    expect(input).toBeInTheDocument();
  });

  it("renders alerts list", async () => {
    const element = (await screen.findByTestId("AlertsList")) as HTMLElement;
    expect(element).toBeInTheDocument();
  });
  it("renders alerts list with no more than 10 items", async () => {
    const elements = (await screen.findAllByText(/title/i)) as HTMLElement[];
    expect(elements.length <= 10).toBeTruthy();
  });
  it("renders all data from db", async () => {
    expect(() => screen.getAllByText("undefined")).toThrow(
      /Unable to find an element with the text: undefined./i
    );
  });
});

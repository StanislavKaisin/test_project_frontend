import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../app/store";
import { ResultsPage } from "./ResultsPage";

describe("Results Page", () => {
  beforeEach(() =>
    render(
      <Provider store={store}>
        <ResultsPage />
      </Provider>
    )
  );
  it("renders title for results list", async () => {
    expect(await screen.findByTestId("resultsListTitile")).toBeInTheDocument();
  });
  it("renders alerts list with no more than 10 items", async () => {
    const elements = (await screen.findAllByText(/title/i)) as HTMLElement[];
    expect(elements.length <= 10).toBeTruthy();
  });
  it("renders pagination element", async () => {
    expect(
      await screen.findByLabelText("pagination navigation")
    ).toBeInTheDocument();
  });
});

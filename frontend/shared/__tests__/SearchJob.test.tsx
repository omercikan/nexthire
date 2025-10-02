import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { store } from "@/shared/redux/store";
import SearchJob from "../components/SearchJob/SearchJob";

describe("Search Job component element tests", () => {
  it("allows typing into the job input", async () => {
    render(
      <Provider store={store}>
        <SearchJob jobInputPlaceholder="Job" />
      </Provider>
    );

    const user = userEvent.setup();

    const jobInput = screen.getByPlaceholderText("Job");
    await user.type(jobInput, "Software");

    expect(jobInput).toHaveValue("Software");
  });

  it("allows typing into the location input", async () => {
    render(
      <Provider store={store}>
        <SearchJob jobInputPlaceholder="Location" />
      </Provider>
    );

    const user = userEvent.setup();

    const locationInput = screen.getByPlaceholderText("Location");
    await user.type(locationInput, "Istanbul");
    expect(locationInput).toHaveDisplayValue("Istanbul");
  });
});

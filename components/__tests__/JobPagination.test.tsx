import { render, screen } from "@testing-library/react";
import JobPagination from "../pages/jobPostings/jobs/JobPagination";
import { Provider } from "react-redux";
import { store } from "@/lib/redux/store";
import useCreateArray from "@/hooks/useCreateArray";
import userEvent from "@testing-library/user-event";

jest.mock("../../hooks/useCreateArray.tsx");

const renderComponent = (jobCount: number) => {
  const pageCount = Math.ceil(jobCount / 10);
  (useCreateArray as jest.Mock).mockReturnValue(
    Array.from({ length: pageCount })
  );
  render(
    <Provider store={store}>
      <JobPagination countJobs={jobCount} />
    </Provider>
  );
};

describe("JobPagination component tests", () => {
  test("Is pagination rendering?", () => {
    renderComponent(20);
    expect(screen.getByTestId("MuiStack-root")).toBeInTheDocument();
  });

  test("renders correct number of pagination buttons when job count is 35", () => {
    renderComponent(35);

    const button = screen.getAllByRole("button");
    expect(button).toHaveLength(6);
  });

  test("Check the first page icon, it should not appear when the number of jobs is 0", () => {
    renderComponent(0);

    const FirstPageIcon = screen.queryByTestId("FirstPageIcon");
    expect(FirstPageIcon).not.toBeInTheDocument();
  });

  test("Check the last page icon, it must be visible the job count length must be at least 100", () => {
    renderComponent(100);

    const LastPageIcon = screen.getByTestId("LastPageIcon");
    expect(LastPageIcon).toBeInTheDocument();
  });

  test("disables next and enables previous when navigating to the last page", async () => {
    const user = userEvent.setup();
    renderComponent(11);

    const nextIcon = screen.getByLabelText("Go to next page");
    const prevIcon = screen.getByLabelText("Go to previous page");

    await user.click(nextIcon);

    expect(nextIcon).toBeDisabled();
    expect(prevIcon).not.toBeDisabled();
  });
});

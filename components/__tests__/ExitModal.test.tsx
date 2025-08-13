import { render, screen, waitFor } from "@testing-library/react";
import { Provider, useSelector } from "react-redux";
import { RootState, store } from "@/lib/redux/store";
import ModalHeader from "../pages/jobDetail/ExitModal/ModalHeader";
import { ReactNode } from "react";
import ExitModal from "../pages/jobDetail/ExitModal/ExitModal";
import userEvent from "@testing-library/user-event";
import { configureStore } from "@reduxjs/toolkit";
import { setExitModalState, touch } from "@/lib/redux/features/touch";
import ModalFooterActions from "../pages/jobDetail/ExitModal/ModalFooterActions";

const renderComponent = (component: ReactNode) => {
  render(<Provider store={store}>{component}</Provider>);
};

const mockCloseFunc = jest.fn();
const user = userEvent.setup();

describe("ExitModal - UI rendering", () => {
  test("should display the correct title and description text", () => {
    // Render the modal
    renderComponent(<ExitModal />);

    // Check for title
    expect(
      screen.getByText("Başvurudan çıkmak istiyor musunuz?")
    ).toBeInTheDocument();

    // Check for description (partial match)
    expect(
      screen.getByText(
        "Başvurudan çıkarsanız, yüklenen dosyalarınız saklanır;",
        { exact: false }
      )
    ).toBeInTheDocument();
  });

  test("should display the close icon when not in small breakpoint mode", () => {
    // Render header in large breakpoint mode
    renderComponent(
      <ModalHeader closeModalFunc={mockCloseFunc} isSmallBreakpoint={false} />
    );

    // Verify the icon is visible
    expect(screen.getByTestId("exitModalCloseIcon")).toBeInTheDocument();
  });

  test("should not display the close icon in small breakpoint mode", () => {
    // Render header in small breakpoint mode
    renderComponent(
      <ModalHeader closeModalFunc={mockCloseFunc} isSmallBreakpoint={true} />
    );

    // Verify the icon is not present
    expect(screen.queryByTestId("exitModalCloseIcon")).not.toBeInTheDocument();
  });
});

describe("ExitModal - user interactions", () => {
  test("should close the modal when clicking on the backdrop", async () => {
    // Test component that conditionally renders modal based on store state
    const Host = () => {
      const isExitModal = useSelector(
        (state: RootState) => state.touch.isExitModal
      );
      return isExitModal ? <ExitModal /> : <div data-testid="closed" />;
    };

    // Create test store and set modal state to open
    const store = configureStore({
      reducer: { touch: touch.reducer },
    });
    store.dispatch(setExitModalState(true));

    // Render with provider
    render(
      <Provider store={store}>
        <Host />
      </Provider>
    );

    // Click on backdrop
    const backdrop = screen.getByTestId("exitModalContainer");
    await user.click(backdrop);

    // Wait until modal is removed from the DOM
    await waitFor(() => {
      expect(
        screen.queryByTestId("exitModalContainer")
      ).not.toBeInTheDocument();
    });

    // Check that the fallback element is visible
    expect(screen.getByTestId("closed")).toBeInTheDocument();
  });

  test("should close the modal when clicking the 'Exit Application' button in the footer", async () => {
    // Test component that conditionally renders footer actions based on store state
    const Host = () => {
      const isExitModal = useSelector(
        (state: RootState) => state.touch.isExitModal
      );

      return isExitModal ? (
        <ModalFooterActions
          closeModalFunc={mockCloseFunc}
          isSmallBreakpoint={false}
        />
      ) : (
        <div data-testid="closedFooterActions" />
      );
    };

    // Create test store and set modal state to open
    const store = configureStore({
      reducer: { touch: touch.reducer },
    });
    store.dispatch(setExitModalState(true));

    // Render with provider
    render(
      <Provider store={store}>
        <Host />
      </Provider>
    );

    // Click the footer action button
    const button = screen.getByRole("button", { name: "Başvurudan Çık" });
    await user.click(button);

    // Wait until the button is no longer in the DOM
    await waitFor(() => {
      expect(screen.queryByText("Başvurudan Çık")).not.toBeInTheDocument();
    });

    // Check that the fallback element is visible
    expect(screen.getByTestId("closedFooterActions")).toBeInTheDocument();
  });
});

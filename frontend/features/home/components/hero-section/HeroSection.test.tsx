import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "@/shared/redux/store";
import HeroSection from "./HeroSection";

describe("HeroSection component tests", () => {
  it("renders the main hero image with correct alt text", () => {
    render(
      <Provider store={store}>
        <HeroSection />
      </Provider>
    );
    const image = screen.getByAltText("Ana sayfa kahraman görseli");
    expect(image).toBeInTheDocument();
  });

  it("renders an h2 heading and a paragraph", () => {
    render(
      <Provider store={store}>
        <HeroSection />
      </Provider>
    );

    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toBeInTheDocument();

    const paragraph = screen.getByText(
      "12.800 iş arasından kariyer fırsatınızı arayın"
    );
    expect(paragraph).toBeInTheDocument();
  });
});

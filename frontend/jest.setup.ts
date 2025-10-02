import "@testing-library/jest-dom/";
import "cross-fetch/polyfill";

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(() => "/mocked-pathname"),
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    pathname: "/mocked-pathname",
  }),
}));

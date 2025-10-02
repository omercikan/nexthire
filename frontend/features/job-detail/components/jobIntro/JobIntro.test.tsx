import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "@/shared/redux/store";
import { Timestamp } from "firebase/firestore";
import JobIntro from "./JobIntro";

jest.mock("../../../../app/api/firebase/firebaseConfig", () => ({
  auth: {},
  db: {},
  provider: {
    setCustomParameters: jest.fn(),
  },
}));

const mockJobDetailData = {
  applicationDeadlineDate: "2025-07-31",
  category: "Yazılım Geliştirme",
  companyLogo:
    "https://res.cloudinary.com/dvolwkh6r/image/upload/v1745622792/N_2_1_regutc.png",
  companyName: "Tech Solutions A.Ş.",
  jobTitle: "Frontend Developer",
  location: "İstanbul, Türkiye",
  modeOfWork: "Uzaktan",
  positionLevel: "Orta Seviye",
  serviceArea: "Bilgi Teknolojileri",
  datePosted: {
    nanoseconds: 246000000,
    seconds: 1750353476,
  } as Timestamp,
  numberOfEmployees: "150",
  postId: "abc123xyz",
};

const renderComponent = (isLoading?: boolean) => {
  render(
    <Provider store={store}>
      <JobIntro data={mockJobDetailData} isLoading={isLoading ?? false} />
    </Provider>
  );
};

test("job title heading is displayed", () => {
  renderComponent();

  const h1 = screen.getByRole("heading", { name: "Frontend Developer" });
  expect(h1).toBeInTheDocument();
});

test("category text is displayed", () => {
  renderComponent();

  const link = screen.getByText("Yazılım Geliştirme", { exact: false });
  expect(link).toBeInTheDocument();
});

test("company logo is visible", () => {
  renderComponent();

  expect(screen.getByAltText("Tech Solutions A.Ş.")).toBeInTheDocument();
});

// test("when loading is true, the date text is hidden and the loading skeleton is shown", () => {
//   renderComponent(true);

  // expect(screen.queryByText("19.06.2025")).not.toBeInTheDocument();
//   expect(screen.getByTestId("time-skeleton")).toBeInTheDocument();
// });

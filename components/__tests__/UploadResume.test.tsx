import { render, screen } from "@testing-library/react";
import UploadResume from "../pages/jobDetail/applicationModal/modalBody/resume/UploadResume";
import { Provider } from "react-redux";
import { testStore } from "../../lib/utils/testStore";
import userEvent from "@testing-library/user-event";
import { Store } from "@reduxjs/toolkit";
import React, { ReactElement } from "react";
import { store as realStore } from "@/lib/redux/store";
import ResumeInput from "../pages/jobDetail/applicationModal/modalBody/resume/uploadResume/ResumeInput";

jest.mock("../../app/api/firebase/firebaseConfig", () => ({
  auth: {},
  db: {},
  provider: {
    setCustomParameters: jest.fn(),
  },
}));

jest.mock("../../lib/utils/validateResume");

const user = userEvent.setup();

const renderComponent = (component: ReactElement, store?: Store) => {
  render(<Provider store={store ?? realStore}>{component}</Provider>);
};

describe("UploadResume Component", () => {
  describe("Static Texts", () => {
    test("should render static texts", () => {
      renderComponent(<UploadResume />);
      expect(screen.getByText(/Özgeçmiş yükle/i)).toBeInTheDocument();
      expect(screen.getByText("PDF (3 MB)")).toBeInTheDocument();
      expect(
        screen.getByText("altyapısıyla yürütülür. Detaylar için", {
          exact: false,
        })
      ).toBeInTheDocument();
      expect(screen.getByText("İleri")).toBeInTheDocument();
    });
  });

  describe("Validation", () => {
    test("displays error message when user proceeds without selecting a resume", async () => {
      const store = testStore({
        applicationModalData: {
          uploadedFileNames: ["1.pdf"],
          selectedResume: "0",
          resumeErrorMessage: "",
          placeholderUploadData: {
            fileName: "",
          },
        },
      });

      renderComponent(<UploadResume />, store);

      const button = screen.getByText("İleri");
      await user.click(button);

      expect(screen.getByText("Lütfen bir özgeçmiş seçin")).toBeInTheDocument();
      expect(
        screen.queryByText("Lütfen bir özgeçmiş (CV) dosyası yükleyin")
      ).not.toBeInTheDocument();
    });
  });

  describe("File Upload Behavior", () => {
    test("should update file name on input change", async () => {
      const mockSetFileValue = jest.fn();
      const file = new File(["file"], "test.pdf", { type: "application/pdf" });

      renderComponent(<ResumeInput setFileValue={mockSetFileValue} />);

      const input = screen.getByTestId("resume-upload-input");
      await user.upload(input, file);

      expect(mockSetFileValue).toHaveBeenCalledWith("test.pdf");
    });
  });
});

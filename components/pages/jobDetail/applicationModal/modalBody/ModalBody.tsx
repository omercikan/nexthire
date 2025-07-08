import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import ModalContactInformation from "./ContactInformation";
import ModalResume from "./resume/Resume";
import AdditionalQuestions from "./AdditionalQuestions";
import ApplicationSummary from "./ApplicationSummary";

const ModalBody = () => {
  const { modalStep } = useSelector(
    (state: RootState) => state.applicationModalProgressBar
  );

  return (
    <main>
      {modalStep === 1 && <ModalContactInformation />}
      {modalStep === 2 && <ModalResume />}
      {modalStep === 3 && <AdditionalQuestions />}
      {modalStep === 4 && <ApplicationSummary />}
    </main>
  );
};

export default ModalBody;

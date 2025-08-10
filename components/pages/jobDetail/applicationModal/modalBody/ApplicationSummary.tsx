import React from "react";
import ContactInformation from "./applicationSummary/contactInformation/ContactInformation";
import SummaryResume from "./applicationSummary/summaryResume/SummaryResume";
import SummaryContent from "./applicationSummary/SummaryContent";
import SummaryQuestions from "./applicationSummary/additionalQuestions/SummaryQuestions";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import ModalFooter from "./ModalFooter";

const ApplicationSummary = () => {
  const additionalQuestionsFromJob = useSelector(
    (state: RootState) => state.applicationModalData.additionalQuestionsFromJob
  );

  return (
    <div className="h-[calc(100%-225.58px)] sm:h-[500px] overflow-auto">
      <div className="px-6 max-sm:px-3">
        <h3 className="text-lg">Başvurunuzu inceleyin</h3>
        <p className="text-sm text-[#00000099]">
          Başvurunuzla birlikte profil bilgileriniz de işverene iletilecektir.
        </p>
      </div>

      <div className="border-t border-t-[#E8E8E8] my-6 mx-6 max-sm:mx-3"></div>

      <ContactInformation />
      <SummaryResume />

      {additionalQuestionsFromJob.isSelectAnswer &&
        additionalQuestionsFromJob.isTextAnswer && (
          <SummaryContent contentTitle="Ek Sorular" step={3}>
            <SummaryQuestions />
          </SummaryContent>
        )}

      <ModalFooter />
    </div>
  );
};

export default ApplicationSummary;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import ModalContactInformation from "./ContactInformation";
import ModalResume from "./resume/Resume";
import AdditionalQuestions from "./AdditionalQuestions";
import ApplicationSummary from "./ApplicationSummary";
import { setScreenState } from "@/lib/redux/features/applicationModal/screenSize";

const ModalBody = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { modalStep } = useSelector(
    (state: RootState) => state.applicationModalProgressBar
  );

  // Updates isSmallScreen Redux state: true if window width is <= 639px, otherwise false
  useEffect(() => {
    const onResize = () => {
      dispatch(setScreenState(window?.innerWidth <= 639 ? true : false));
    };

    onResize();
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      onResize();
    };
  }, [dispatch]);

  return (
    <main className="h-full">
      {modalStep === 1 && <ModalContactInformation />}
      {modalStep === 2 && <ModalResume />}
      {modalStep === 3 && <AdditionalQuestions />}
      {modalStep === 4 && <ApplicationSummary />}
    </main>
  );
};

export default ModalBody;

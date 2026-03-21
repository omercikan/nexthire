import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ModalContactInformation from "./ContactInformation";
import ModalResume from "./resume/Resume";
import AdditionalQuestions from "./AdditionalQuestions";
import ApplicationSummary from "./ApplicationSummary";
import { AppDispatch, RootState } from "@/shared/redux/store";
import { setScreenState } from "@/shared/redux/slices/applicationModal/screenSize";

const ModalBody = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { step } = useSelector((state: RootState) => state.modalControlSlice);

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
      {step === 1 && <ModalContactInformation />}
      {step === 2 && <ModalResume />}
      {step === 3 && <AdditionalQuestions />}
      {step === 4 && <ApplicationSummary />}
    </main>
  );
};

export default ModalBody;

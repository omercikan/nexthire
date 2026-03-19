"use client";

import { RootState } from "@/shared/redux/store";
import { useSelector } from "react-redux";
import dynamic from "next/dynamic";

const ApplicationModal = dynamic(() => import("./ApplicationModal"), {
  ssr: false,
});

const ApplicationModalWrapper = () => {
  const isOpenModal = useSelector(
    (state: RootState) => state.touch.openApplicationModal,
  );

  return <>{isOpenModal && <ApplicationModal />}</>;
};

export default ApplicationModalWrapper;

import CustomButton from "@/shared/components/ui/CustomButton";
import useMultipleDispatch from "@/shared/hooks/useMultipleDispatch";
import { resetApplicationData } from "@/shared/redux/slices/applicationModal/modalData";
import { resetProgressBarValue } from "@/shared/redux/slices/applicationModal/progressBar";
import { changeShowMoreResumes, setApplicationModal, setExitModalState } from "@/shared/redux/slices/touch";
import React, { memo } from "react";

const ModalFooterActions = ({
  isSmallBreakpoint,
  closeModalFunc,
}: {
  isSmallBreakpoint: boolean;
  closeModalFunc: () => { payload: boolean; type: "touch/setExitModalState" };
}) => {
  const multipleDispatch = useMultipleDispatch();

  const handleExitApplication = () => {
    document.body.style.overflow = "visible";
    multipleDispatch([
      setExitModalState(false),
      setApplicationModal(false),
      resetApplicationData(),
      resetProgressBarValue(),
      changeShowMoreResumes(false),
    ]);
  };

  return (
    <div className="text-end border-t max-sm:flex max-sm:justify-between border-gray-200 py-3 max-sm:py-0 sm:px-4">
      <CustomButton
        text="Başvurudan Çık"
        className="exit-modal-button"
        handleClick={handleExitApplication}
      />

      {isSmallBreakpoint && <span className="border border-gray-200"></span>}

      {isSmallBreakpoint && (
        <CustomButton
          text="Devam Et"
          className="exit-modal-button"
          handleClick={closeModalFunc}
        />
      )}
    </div>
  );
};

export default memo(ModalFooterActions);

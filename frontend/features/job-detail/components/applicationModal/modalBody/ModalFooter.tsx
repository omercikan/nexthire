import React from "react";
import InformationMessage from "../modalUI/InformationMessage";
import ModalControls from "../modalControls/ModalControls";

const ModalFooter = ({ isValid }: { isValid: boolean }) => {
  return (
    <div className="max-sm:fixed bottom-0 left-0 max-sm:px-3 px-6 max-sm:bg-white">
      <InformationMessage />
      <ModalControls isValid={isValid} />
    </div>
  );
};

export default ModalFooter;

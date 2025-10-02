import React from "react";
import InformationMessage from "../modalUI/InformationMessage";
import ModalControls from "../modalControls/ModalControls";

const ModalFooter = ({
  errors = [],
  values = {},
  extraControl,
}: {
  errors?: object;
  values?: object | string;
  extraControl?: {
    state: boolean | undefined;
    message: string;
  };
}) => {
  return (
    <div className="max-sm:fixed bottom-0 left-0 max-sm:px-3 px-6 max-sm:bg-white">
      <InformationMessage />
      <ModalControls
        isErrors={Object.keys(errors)}
        formValues={values}
        extraControl={extraControl}
      />
    </div>
  );
};

export default ModalFooter;

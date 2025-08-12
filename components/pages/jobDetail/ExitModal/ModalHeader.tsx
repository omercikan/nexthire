import React, { memo } from "react";
import { IoCloseOutline } from "react-icons/io5";

const ModalHeader = ({
  isSmallBreakpoint,
  closeModalFunc,
}: {
  isSmallBreakpoint: boolean;
  closeModalFunc: () => { payload: boolean; type: "touch/setExitModalState" };
}) => {
  return (
    <div className="flex justify-between max-sm:justify-center p-4 max-sm:px-3 sm:border-b sm:border-gray-200">
      <h2
        className="text-lg text-[#000000E6] font-medium max-[375px]:text-[16px] max-[320px]:text-center"
        id="application-exit-modal-title"
      >
        Başvurudan çıkmak istiyor musunuz?
      </h2>

      {!isSmallBreakpoint && (
        <button onClick={closeModalFunc} data-testid="exitModalCloseButton">
          <IoCloseOutline size={32} data-testid="exitModalCloseIcon" />
        </button>
      )}
    </div>
  );
};

export default memo(ModalHeader);

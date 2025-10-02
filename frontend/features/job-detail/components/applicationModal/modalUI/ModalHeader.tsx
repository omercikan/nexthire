import { setExitModalState } from "@/shared/redux/slices/touch";
import { AppDispatch, RootState } from "@/shared/redux/store";
import React from "react";
import { IoCloseOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";

const ModalHeader = ({
  companyName,
  jobTitle,
}: {
  companyName: string;
  jobTitle: string;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { isSmallScreen } = useSelector(
    (state: RootState) => state.applyModalScreen
  );

  const handleCloseModal = () => dispatch(setExitModalState(true));

  return (
    <div className="flex justify-between items-center max-md:items-start max-md:gap-x-3 py-4 px-6 max-sm:px-3 border-b border-gray-200">
      <h2 className="text-xl font-medium max-[430px]:text-lg max-md:self-end whitespace-nowrap text-ellipsis overflow-hidden">
        {isSmallScreen ? (
          <>
            <strong className="font-medium">{companyName}</strong> şirketine
            başvuruyorsunuz
          </>
        ) : (
          <>
            <strong className="font-medium">{companyName}</strong> şirketinin{" "}
            <strong className="font-medium">{jobTitle}</strong> ilanına
            başvuruyorsunuz
          </>
        )}
      </h2>

      <button onClick={handleCloseModal}>
        <IoCloseOutline size={32} />
      </button>
    </div>
  );
};

export default ModalHeader;

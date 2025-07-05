import { resetProgressBarValue } from "@/lib/redux/features/applicationModal/progressBar";
import { setApplicationModal } from "@/lib/redux/features/touch";
import { AppDispatch } from "@/lib/redux/store";
import React from "react";
import { IoCloseOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";

const ModalHeader = ({
  companyName,
  jobTitle,
}: {
  companyName: string;
  jobTitle: string;
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleCloseModal = () => {
    dispatch(setApplicationModal(false));
    dispatch(resetProgressBarValue());
    document.body.style.overflow = "visible";
  };

  return (
    <div className="flex justify-between items-center max-md:items-start py-4 px-6 border-b border-gray-200">
      <h2 className="text-xl font-medium max-[430px]:text-lg">
        <strong className="font-medium">{companyName}</strong> şirketinin{" "}
        <strong className="font-medium">{jobTitle}</strong> ilanına
        başvuruyorsunuz{" "}
      </h2>

      <button onClick={handleCloseModal}>
        <IoCloseOutline size={32} />
      </button>
    </div>
  );
};

export default ModalHeader;

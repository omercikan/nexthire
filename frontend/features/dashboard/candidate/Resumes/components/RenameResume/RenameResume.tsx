import CustomButton from "@/shared/components/ui/CustomButton";
import React from "react";
import { IoCloseOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { setRenameResumeID } from "../../resumeSlice";
import { CVDataFields } from "@/shared/types/resume";
import RenameResumeForm from "./RenameResumeForm";

const RenameResume = ({
  file: { _id, originalName: filename },
}: {
  file: CVDataFields;
}) => {
  const dispatch = useDispatch();

  const handleCloseModal = () => dispatch(setRenameResumeID(""));

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black/50 z-50">
      <div className="w-[500px] max-sm:w-[95%] shadow-2xl drop-shadow-2xl">
        <div className="bg-[#f5f7fa] flex items-center justify-between rounded-t-[5px] p-5">
          <h4 className="text-lg font-medium">Yeniden Adlandır</h4>

          <CustomButton
            className="!bg-transparent !py-0"
            handleClick={handleCloseModal}
          >
            <IoCloseOutline color="000" size={26} strokeWidth={6} />
          </CustomButton>
        </div>

        <div className="bg-white rounded-b-[5px]">
          <RenameResumeForm
            closeModalFn={handleCloseModal}
            filename={filename}
            fileID={_id}
          />
        </div>
      </div>
    </div>
  );
};

export default RenameResume;

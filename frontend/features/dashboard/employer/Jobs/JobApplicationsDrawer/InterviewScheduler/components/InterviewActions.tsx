import CustomButton from "@/shared/components/ui/CustomButton";
import { Dispatch, SetStateAction } from "react";
import { IoCloseOutline } from "react-icons/io5";

interface InterviewActionsProps {
  actionMode: string | null;
  handleClose: () => void;
  setIsCancelInterview: Dispatch<SetStateAction<boolean>>;
}

const InterviewActions = ({
  actionMode,
  handleClose,
  setIsCancelInterview,
}: InterviewActionsProps) => {
  return (
    <div className="flex flex-col gap-2 sticky bottom-0 bg-[#eff2f5]/30 px-5 py-4 border-t border-t-border">
      <CustomButton
        text={actionMode === "interview_edit" ? "Güncelle" : "Mülakatı Planla"}
        className="py-2.5! px-4! shadow-xs whitespace-nowrap font-medium w-full rounded-lg! bg-[#0072D5]! hover:bg-[#0072D5]/90! text-sm"
      />

      <div className="flex gap-2">
        <CustomButton
          text="İptal"
          className="py-[7.1px]! px-4! shadow-xs whitespace-nowrap font-medium w-full rounded-lg! text-[#050c13]! border border-border bg-transparent! hover:bg-[#edf2f8]/90! text-sm"
          handleClick={handleClose}
        />

        {actionMode === "interview_edit" && (
          <CustomButton
            className="py-[7.1px]! px-4! shadow-xs whitespace-nowrap font-medium w-full rounded-lg!  border border-border bg-transparent! hover:bg-[#e7000b]/10! text-sm flex items-center gap-2 text-[#e7000b]!"
            handleClick={() => setIsCancelInterview(true)}
          >
            <IoCloseOutline size={15} />
            Mülakatı İptal Et
          </CustomButton>
        )}
      </div>
    </div>
  );
};

export default InterviewActions;

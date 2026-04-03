import CustomButton from "@/shared/components/ui/CustomButton";
import useJobStatus from "@/shared/hooks/useJobStatus";
import { LuPencil } from "react-icons/lu";
import React from "react";

const buttonClassName =
  "rounded-md! py-1.5! text-sm flex items-center gap-2 font-medium";

interface JobDraftActionsProps {
  info: React.ReactNode;
  containerClassName?: string
  wrapperClassName?: string
}

const JobDraftActions: React.FC<JobDraftActionsProps> = ({ info, containerClassName = "", wrapperClassName = "" }) => {
  const jobStatus = useJobStatus();

  return (
    <>
      {jobStatus === "draft" && (
        <div className={`fixed bg-white w-full z-1001 py-3 ${containerClassName}`}>
          <div className={`container mx-auto flex flex-wrap gap-2 items-center justify-between ${wrapperClassName}`}>
            {info}

            <div className="flex gap-2">
              <CustomButton
                className={`${buttonClassName} px-3 not-hover:bg-white! text-black! border border-[#dedede] shadow-sm hover:text-[#063ad7]! hover:bg-[#e8effc]!`}
              >
                <LuPencil />
                Düzenle
              </CustomButton>

              <CustomButton
                className={`${buttonClassName} bg-[#063ad7]! px-4 hover:opacity-90`}
              >
                Yayınla
              </CustomButton>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default JobDraftActions;

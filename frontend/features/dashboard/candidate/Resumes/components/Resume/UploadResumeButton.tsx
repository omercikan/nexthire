import { useUploadResumeMutation } from "@/features/dashboard/services/candidateResumeApi";
import CustomButton from "@/shared/components/ui/CustomButton";
import FileInput from "@/shared/components/ui/FileInput";
import { validateResume } from "@/shared/utils/validateResume";
import { Tooltip } from "@mui/material";
import React, { useRef } from "react";
import toast from "react-hot-toast";
import { AiOutlineCloudUpload } from "react-icons/ai";

const UploadResumeButton = ({
  userId,
  className,
  resumeLength,
}: {
  userId: string;
  className?: string;
  resumeLength?: number;
}) => {
  const [uploadResume, { isLoading }] = useUploadResumeMutation();
  const fileRef = useRef<HTMLInputElement | null>(null);
  const isResumeLimitReached = resumeLength === 4;

  const handleUploadResume = async () => {
    const file = fileRef.current?.files?.[0];

    if (file) {
      const message = await validateResume(file);
      if (message) return toast.error(message);

      const formData = new FormData();
      formData.append("resume", file);
      formData.append("userId", userId);

      try {
        const response = await uploadResume(formData).unwrap();

        if (response.message) {
          if (fileRef.current) fileRef.current.value = "";
        }
      } catch {
        toast.error("Özgeçmiş yüklenemedi. Lütfen tekrar deneyin.");
      }
    }
  };

  return (
    <>
      {!isResumeLimitReached && (
        <FileInput
          id="resumeUpload"
          accept=".pdf"
          onChange={handleUploadResume}
          ref={fileRef}
        />
      )}

      <CustomButton
        circularColor="#fff"
        type="submit"
        className={`${className} ${
          isLoading ? "px-[63px] !bg-[#1814f3]" : "!py-0 !bg-transparent"
        } `}
        isSubmitting={isLoading}
      >
        <Tooltip
          arrow
          title={
            isResumeLimitReached ? "En Fazla 4 Özgeçmiş Yükleyebilirsiniz" : ""
          }
          slotProps={{
            tooltip: { sx: { backgroundColor: "#000" } },
            arrow: { sx: { color: "#000" } },
          }}
        >
          <label
            htmlFor="resumeUpload"
            className={`custom__button flex gap-x-3 items-center ps-8 pe-12 cursor-pointer !bg-[#1814f3] active:scale-95 ${
              isResumeLimitReached ? "!cursor-not-allowed !scale-100" : ""
            }`}
          >
            <AiOutlineCloudUpload /> Yükle
          </label>
        </Tooltip>
      </CustomButton>
    </>
  );
};

export default UploadResumeButton;

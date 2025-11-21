import CustomButton from "@/shared/components/ui/CustomButton";
import CustomInput from "@/shared/components/ui/CustomInput";
import React from "react";
import useRenameForm from "./useRenameForm";
import { RenameFormProps } from "./types";
import { Form } from "react-hook-form";

const RenameResumeForm = ({
  filename,
  fileID,
  closeModalFn,
}: {
  closeModalFn: () => {
    payload: string;
    type: "resumeSlice/setRenameResumeID";
  };
} & RenameFormProps) => {
  const { error, isLoading, control, onSubmit, register, watch } =
    useRenameForm({
      filename,
      fileID,
    });

  return (
    <Form onSubmit={onSubmit} control={control}>
      <CustomInput
        label="Dosya adı *"
        labelClass="text-xs"
        className="!rounded-[5px] text-xs !px-3 !py-1"
        wrapperClass="p-5"
        value={watch("filename")}
        error={error}
        {...register("filename", {
          required: "Dosya adı boş bırakılamaz",
          validate: (value) => {
            if (value === filename) {
              return "Mevcut isim kullanılamaz";
            }
          },
        })}
      />

      <div className="p-5 border-t mt-5 border-t-gray-200 flex items-center justify-end gap-2">
        <CustomButton
          text="İptal Et"
          className="!rounded-sm px-4 !py-2.5 !bg-gray-500 hover:!bg-gray-600 text-sm"
          handleClick={closeModalFn}
          type="button"
        />

        <CustomButton
          text="Kaydet"
          isSubmitting={isLoading}
          circularColor="white"
          className={`!rounded-sm px-4 !py-2.5 text-sm !bg-[#4045ef] hover:!bg-[#3036f0] ${
            error || filename === watch("filename")
              ? "opacity-75 pointer-events-none"
              : ""
          }`}
        />
      </div>
    </Form>
  );
};

export default RenameResumeForm;

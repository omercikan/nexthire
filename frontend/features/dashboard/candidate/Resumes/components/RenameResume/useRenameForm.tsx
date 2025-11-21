import { useRenameResumeMutation } from "@/features/dashboard/services/candidateResumeApi";
import { useCallback, useEffect } from "react";
import { setRenameResumeID } from "../../resumeSlice";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/shared/redux/store";
import { useForm } from "react-hook-form";
import { RenameFormProps } from "./types";

const useRenameForm = ({ filename, fileID }: RenameFormProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    register,
    watch,
    setFocus,
    control,
    formState: { errors, defaultValues },
  } = useForm({
    defaultValues: { filename },
  });
  const [renameResume, { isLoading }] = useRenameResumeMutation();

  useEffect(() => setFocus("filename"), [setFocus]);

  const onSubmit = useCallback(async () => {
    if (watch("filename") === defaultValues?.filename) return;

    try {
      const response = await renameResume({
        fileID,
        newName: watch("filename"),
      }).unwrap();
      if (response.message) {
        toast.success(
          `'${defaultValues?.filename}' dosya adı '${filename}' olarak yeniden adlandırıldı.`,
          { position: "bottom-center" }
        );
        dispatch(setRenameResumeID(""));
      }
    } catch {
      toast.error("Dosya adı güncellenemedi. Lütfen tekrar deneyin", {
        id: "renameResumeError",
      });
    }
  }, [
    fileID,
    watch,
    defaultValues?.filename,
    dispatch,
    filename,
    renameResume,
  ]);

  return {
    register,
    onSubmit,
    watch,
    error: errors.filename?.message,
    control,
    isLoading,
  };
};

export default useRenameForm;

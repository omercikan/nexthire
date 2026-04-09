import { SubmitHandler, useForm } from "react-hook-form";
import {
  formFields,
  shareJobFormSchema,
  shareJobFormSchemaType,
} from "./validations/formValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { SHARE_JOB_DEFAULT_VALUES } from "./defaultValues.constant";
import { SHARE_JOB_FIELDS } from "./fields.constant";
import { usePublishJobMutation } from "../services/jobApi";
import { useContext, useEffect } from "react";
import { AuthContext } from "@/features/auth/authContext";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import { selectAllQuestions } from "./CandidateQuestion/slice/candidateQuestionSlice";
import { ApplicationMethod } from "@/shared/types/jobDetail";
import useJobEditMode from "./hooks/useJobEditMode";
import useJobEditData from "./hooks/useJobEditData";

const useFormHandler = () => {
  const [publishJob] = usePublishJobMutation();
  const { user } = useContext(AuthContext);
  const screeningQuestions = useSelector(selectAllQuestions);
  const params = useSearchParams();

  const currentEditedData = useJobEditData();
  const isEditMode = useJobEditMode();

  const methods = useForm<shareJobFormSchemaType>({
    defaultValues: SHARE_JOB_DEFAULT_VALUES,
    resolver: zodResolver(shareJobFormSchema),
    mode: "onChange",
  });

  const {
    register,
    formState: { errors, isSubmitting, isDirty },
    setValue,
    watch,
    handleSubmit,
  } = methods;

  const router = useRouter();

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty && !currentEditedData) e.preventDefault();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty, currentEditedData]);

  useEffect(() => {
    if (isEditMode) {
      for (const data in currentEditedData) {
        const editedData = data as formFields;

        if (data in SHARE_JOB_DEFAULT_VALUES) {
          setValue(data as formFields, currentEditedData[editedData], {
            shouldDirty: true,
          });
        }
      }

      if (currentEditedData?.applicationMethod) {
        const methodMap: Record<string, string> = {
          NextHire: "NextHire üzerinden",
          external_link: "Kendi sitemiz üzerinden",
          email: "E-posta ile",
        };

        const mappedValue = methodMap[currentEditedData.applicationMethod];

        if (mappedValue)
          setValue("applicationMethod", mappedValue, { shouldDirty: true });
      }
    }
  }, [params, setValue, isEditMode, currentEditedData]);

  const onSubmit: SubmitHandler<shareJobFormSchemaType> = async (values) => {
    function includesValue(value: string) {
      return values.applicationMethod.includes(value);
    }

    const questionValidations = screeningQuestions.every((question) => {
      switch (question.type) {
        case "Kısa Metin":
          return question.characterLimit ? true : false;
        case "Uzun Metin":
          return question.characterLimit ? true : false;
        case "Çoklu Seçim":
          return question.options?.every((val) => val !== "");
        case "Evet / Hayır":
          return true;
        default:
          return false;
      }
    });

    const applicationMethod: ApplicationMethod = includesValue("NextHire")
      ? "NextHire"
      : includesValue("Kendi")
        ? "external_link"
        : "email";

    const data = {
      ...values,
      applicationMethod,
      employerId: user?._id as string,
      screeningQuestions,
    };

    try {
      if (!questionValidations) return;
      const res = await publishJob({
        data,
        jobId: isEditMode ? (params.get("jobId") as string) : undefined,
        action: "draft",
      }).unwrap();
      if (res) {
        router.push(`/is-ilani/${res._id}`);
      }
    } catch {
      toast.error(
        "İş ilanı oluşturulurken bir hata oluştu. Lütfen tekrar deneyiniz.",
      );
    }
  };

  const inputFields = SHARE_JOB_FIELDS.filter(({ type }) => type === "input");
  const selectFields = SHARE_JOB_FIELDS.filter(({ type }) => type === "select");

  return {
    onSubmit,
    register,
    setValue,
    watch,
    handleSubmit,
    methods,
    errors,
    isSubmitting,
    inputFields,
    selectFields,
  };
};

export default useFormHandler;

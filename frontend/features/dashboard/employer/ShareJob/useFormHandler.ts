import { SubmitHandler, useForm } from "react-hook-form";
import { shareJobFormSchema, shareJobFormSchemaType } from "./formValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { SHARE_JOB_DEFAULT_VALUES } from "./defaultValues.constant";
import { SHARE_JOB_FIELDS } from "./fields.constant";
import { useCreateJobMutation } from "../services/jobApi";
import { useContext } from "react";
import { AuthContext } from "@/features/auth/authContext";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { selectAllQuestions } from "./CandidateQuestion/slice/candidateQuestionSlice";

const useFormHandler = () => {
  const [createJob] = useCreateJobMutation();
  const { user } = useContext(AuthContext);
  const screeningQuestions = useSelector(selectAllQuestions);

  const methods = useForm<shareJobFormSchemaType>({
    defaultValues: SHARE_JOB_DEFAULT_VALUES,
    resolver: zodResolver(shareJobFormSchema),
    mode: "onChange",
  });

  const {
    register,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    handleSubmit,
  } = methods;

  const router = useRouter();

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
      }
    });

    const applicationMethod = includesValue("NextHire")
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

      const res = await createJob(data).unwrap();

      if (res) {
        router.push(`/is-ilani/${values.jobTitle}/${res._id}?action=preview`);
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

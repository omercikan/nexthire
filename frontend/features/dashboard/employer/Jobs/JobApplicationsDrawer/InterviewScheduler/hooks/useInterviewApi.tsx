import { AppDispatch, RootState } from "@/shared/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { resetScheduler, setError } from "../interviewSchedulerSlice";
import { useCreateInterviewMutation } from "../InterviewApi";
import { InterviewActionsProps } from "../components/InterviewActions";
import { CreateInterviewRequest } from "../../types/interview.types";
import toast from "react-hot-toast";
import { usePathname, useRouter } from "next/navigation";

const MEETING_LINK_REGEX =
  /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/;

const useInterviewApi = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { errors: _, ...interviewScheduler } = useSelector(
    (state: RootState) => state.interviewScheduler,
  );
  const router = useRouter();
  const pathname = usePathname();

  const [createInterview] = useCreateInterviewMutation();

  const handleInterview = async (
    actionMode: string | null,
    interview: InterviewActionsProps["interview"],
  ) => {
    const fields = [
      { field: "scheduledAt", error: "Tarih seçiniz" },
      { field: "scheduledTime", error: "Saat seçiniz" },
      interviewScheduler.type === "online"
        ? { field: "meetingLink", error: "Toplantı bağlantısını giriniz" }
        : { field: "location", error: "Konum giriniz" },
    ];

    let hasErrors = false;

    for (const { field, error } of fields) {
      const matchField =
        interviewScheduler[field as keyof typeof interviewScheduler];

      if (!Boolean(matchField)) {
        dispatch(setError({ [field]: error }));
        hasErrors = true;
      } else if (
        field === "meetingLink" &&
        typeof matchField === "string" &&
        !MEETING_LINK_REGEX.test(matchField)
      ) {
        dispatch(setError({ meetingLink: "Geçerli bağlantı giriniz" }));
        hasErrors = true;
      }
    }

    if (hasErrors) return;

    switch (actionMode) {
      case "create_interview":
        try {
          const payload = {
            ...interviewScheduler,
            ...interview,
          } as CreateInterviewRequest;

          const createdInterview = await createInterview(payload).unwrap();

          if (createdInterview) {
            toast.success("Mülakat başarıyla planlandı.");
            dispatch(resetScheduler());
            router.replace(pathname, { scroll: false });
            return;
          }
        } catch (error) {
          const message =
            error instanceof Error
              ? error.message
              : "Mülakat oluşturulamadı. Lütfen tekrar deneyin.";
          toast.error(message);
        }
    }
  };

  return { handleInterview };
};

export default useInterviewApi;

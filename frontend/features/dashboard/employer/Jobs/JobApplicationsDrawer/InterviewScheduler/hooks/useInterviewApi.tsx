import { AppDispatch, RootState } from "@/shared/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { resetScheduler, setError } from "../interviewSchedulerSlice";
import {
  useCreateInterviewMutation,
  useEditInterviewMutation,
} from "../InterviewApi";
import { InterviewActionsProps } from "../components/InterviewActions";
import { CreateInterviewRequest } from "../../types/interview.types";
import toast from "react-hot-toast";
import { usePathname, useRouter } from "next/navigation";
import { useEditInterview } from "../context/InterviewEditContext";

const MEETING_LINK_REGEX =
  /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/;

const useInterviewApi = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { errors: _, ...interviewScheduler } = useSelector(
    (state: RootState) => state.interviewScheduler,
  );
  const editInterviewData = useEditInterview();
  const router = useRouter();
  const pathname = usePathname();

  const [createInterview] = useCreateInterviewMutation();
  const [editInterview] = useEditInterviewMutation();

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
        break;
      case "interview_edit":
        const updatedFields: Partial<CreateInterviewRequest> = {};

        for (const key in interviewScheduler) {
          const typedKey = key as keyof typeof interviewScheduler;
          const newValue = interviewScheduler[typedKey];
          const oldValue = editInterviewData[typedKey];

          if (!Boolean(newValue) && !Boolean(oldValue)) continue;
          if (newValue === oldValue) continue;

          (updatedFields as Record<string, unknown>)[key] = newValue;
        }

        if (Object.keys(updatedFields).length === 0) {
          toast("Güncellenecek bir alan bulunamadı.", {
            icon: "ℹ️",
          });
          break;
        }

        try {
          const editedInterview = await editInterview({
            interviewId: editInterviewData._id,
            updateData: updatedFields,
          }).unwrap();

          if (editedInterview) {
            toast.success("Mülakat başarıyla güncellendi.");
            dispatch(resetScheduler());
            router.replace(pathname, { scroll: false });
            return;
          }
        } catch (error) {
          const message =
            error instanceof Error
              ? error.message
              : "Mülakat güncellenemedi. Lütfen tekrar deneyin.";
          toast.error(message);
        }

        break;
    }
  };

  return { handleInterview };
};

export default useInterviewApi;

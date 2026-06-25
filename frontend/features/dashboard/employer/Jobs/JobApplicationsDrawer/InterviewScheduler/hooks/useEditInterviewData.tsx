import { useSearchParams } from "next/navigation";
import { useGetInterviewQuery } from "../InterviewApi";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/shared/redux/store";
import { useEffect } from "react";
import { setInterview } from "../interviewSchedulerSlice";

const useEditInterviewData = (
  interviewId: string,
  actionMode: string | null,
) => {
  const searchParams = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();


  const { data: interview } = useGetInterviewQuery(
    { interviewId: interviewId },
    { skip: actionMode !== "interview_edit" || !searchParams.get("jobId") },
  );

  useEffect(() => {
    if (interview && actionMode === "interview_edit") {
      dispatch(
        setInterview({
          scheduledAt: interview.scheduledAt,
          scheduledTime: interview.scheduledTime,
          type: interview.type,
          meetingLink: interview.meetingLink ?? "",
          location: interview.location ?? "",
          notes: interview.notes ?? "",
        }),
      );
    }
  }, [interview, actionMode, dispatch]);

  return interview;
};

export default useEditInterviewData;

import { createContext, ReactNode, useContext } from "react";
import { CreateInterviewRequest } from "../../types/interview.types";
import useEditInterviewData from "../hooks/useEditInterviewData";

type InterviewEditContext = Omit<CreateInterviewRequest, "candidateId"> & {
  _id: string;
};

export const InterviewEditContext = createContext<InterviewEditContext>({
  _id: "",
  scheduledAt: "",
  scheduledTime: "",
  type: "online",
  location: "",
  meetingLink: "",
  notes: "",
  positionId: "",
  positionTitle: "",
});

export const InterviewEditContextProvider = ({
  children,
  interviewId,
  actionMode,
}: {
  children: ReactNode;
  interviewId: string;
  actionMode: string | null;
}) => {
  const interview = useEditInterviewData(interviewId, actionMode);

  if (!interview) return;

  return (
    <InterviewEditContext.Provider value={interview}>
      {children}
    </InterviewEditContext.Provider>
  );
};

export const useEditInterview = () => {
  const interview = useContext(InterviewEditContext);
  return interview;
};

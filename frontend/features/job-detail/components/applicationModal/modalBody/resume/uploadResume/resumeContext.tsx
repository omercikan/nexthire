import { AuthContext } from "@/features/auth/authContext";
import { RootState } from "@/shared/redux/store";
import { validateResume } from "@/shared/utils/validateResume";
import { nanoid } from "@reduxjs/toolkit";
import { createContext, ReactNode, useContext, useState } from "react";
import { useSelector } from "react-redux";

type Resume = Partial<
  File & {
    _id: string;
    fileUrl: string;
    createdAt: Date;
    updatedAt: Date;
  }
>;

interface ResumeContextType {
  resumes: Resume[];
  errorMessage: string;
  isValid: boolean;
  handleResume: (resume: Resume | undefined) => void;
}

const ResumeContext = createContext<ResumeContextType | null>(null);

export const ResumeProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useContext(AuthContext);
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const { selectedResume } = useSelector(
    (state: RootState) => state.applicationModalData,
  );

  const handleResume = (resume: Resume | undefined) => {
    if (!user) return;
    if (!resume) return;

    const errorMessage = validateResume(resume as File);
    if (errorMessage) return setErrorMessage(errorMessage);

    setResumes((prev) => {
      const updated = [Object.assign(resume, { _id: nanoid() }), ...prev];
      if (updated.length > 6) {
        updated.pop();
      }

      return updated;
    });
    setErrorMessage("");
  };

  return (
    <ResumeContext.Provider
      value={{
        resumes,
        errorMessage,
        handleResume,
        isValid: !!resumes.length && !errorMessage && !!selectedResume,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => {
  const ctx = useContext(ResumeContext);
  if (!ctx) throw new Error("useResume must be used within ResumeProvider");
  return ctx;
};

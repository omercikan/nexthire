import { AuthContext } from "@/features/auth/authContext";
import { useJob } from "@/features/jobs/context/JobContext";
import { RootState } from "@/shared/redux/store";
import { validateResume } from "@/shared/utils/validateResume";
import { nanoid } from "@reduxjs/toolkit";
import { createContext, ReactNode, useContext, useState } from "react";
import { useSelector } from "react-redux";
import { Resume as SavedResume } from "@/features/jobs/context/JobContext";
import useSelectResume from "@/shared/hooks/useSelectResume";

type Resume = Partial<
  File & {
    _id: string;
    fileUrl: string;
    createdAt: Date;
    updatedAt: Date;
  }
>;

interface ResumeContextType {
  resumes: (Resume | SavedResume)[];
  errorMessage: string;
  isValid: boolean;
  removedResumeNames: string[];
  handleResume: (resume: Resume | undefined) => void;
  setResumes: React.Dispatch<React.SetStateAction<(Resume | SavedResume)[]>>;
}

export const getResumeName = (resume: Resume | SavedResume): string => {
  if ("originalName" in resume) return resume.originalName;
  return resume.name ?? "";
};

const ResumeContext = createContext<ResumeContextType | null>(null);

export const ResumeProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useContext(AuthContext);
  const { resumes: savedResumes } = useJob();
  const [resumes, setResumes] =
    useState<(Resume | SavedResume)[]>(savedResumes);
  const [errorMessage, setErrorMessage] = useState("");
  const { selectedResume } = useSelector(
    (state: RootState) => state.applicationModalData,
  );
  const [setSelectedResumeData] = useSelectResume();
  const [removedResumeNames, setRemovedResumeNames] = useState<string[]>([]);

  const handleResume = (resume: Resume | undefined) => {
    if (!user) return;
    if (!resume) return;

    const errorMessage = validateResume(resume as File);
    if (errorMessage) return setErrorMessage(errorMessage);

    const newResume = Object.assign(resume, { _id: nanoid() });

    setResumes((prev) => {
      const updated = [newResume, ...prev];
      if (updated.length > 6) {
        if (savedResumes.length > 0) {
          const removedResumeName = (
            updated.findLast((resume) => resume) as SavedResume
          ).fileName;

          if (typeof removedResumeName !== "undefined") {
            setRemovedResumeNames([...removedResumeNames, removedResumeName]);
          }
        }

        updated.pop();
      }

      return updated;
    });

    setSelectedResumeData(
      "",
      newResume._id,
      getResumeName(resume),
      resume.createdAt as Date,
    );

    setErrorMessage("");
  };

  return (
    <ResumeContext.Provider
      value={{
        resumes,
        errorMessage,
        handleResume,
        setResumes,
        removedResumeNames,
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

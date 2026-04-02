import { JobData } from "@/shared/types/jobDetail";
import { createContext, useContext } from "react";

type StatusValue = "pending" | "reviewed" | "accepted" | "rejected";

export interface Resume {
  _id: string;
  userId: string;
  fileName: string;
  fileUrl: string;
  originalName: string;
  size: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AppliedData {
  _id: string;
  resume: { originalName: string; size: number; url: string };
  status: { _id: string; changedAt: Date; value: StatusValue }[];
}

export interface JobContextProviderProps {
  job: Partial<JobData>;
  appliedData?: AppliedData;
  totalApplicationCount?: number;
  resumes?: Resume[];
  children?: React.ReactNode;
}

const JobContext = createContext<JobContextProviderProps | null>(null);

export const useJob = () => {
  const ctx = useContext(JobContext);
  if (!ctx) throw new Error("useJob must be used within JobProvider");
  return ctx;
};

export const JobContextProvider = ({
  job,
  children,
  appliedData,
  resumes,
  totalApplicationCount,
}: JobContextProviderProps) => {
  return (
    <JobContext.Provider
      value={{ job, appliedData, totalApplicationCount, resumes }}
    >
      {children}
    </JobContext.Provider>
  );
};

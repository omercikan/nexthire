import { JobData } from "@/shared/types/jobDetail";
import { createContext, useContext } from "react";

interface JobContextProviderProps {
  job: JobData;
  hasApplied: boolean;
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
  hasApplied,
}: JobContextProviderProps) => {
  return (
    <JobContext.Provider value={{ job, hasApplied }}>
      {children}
    </JobContext.Provider>
  );
};

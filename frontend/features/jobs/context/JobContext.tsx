import { JobData } from "@/shared/types/jobDetail";
import { createContext, useContext } from "react";

const JobContext = createContext<JobData | null>(null);

export const useJob = () => {
  const ctx = useContext(JobContext);
  if (!ctx) throw new Error("useJob must be used within JobProvider");
  return ctx;
};

export const JobContextProvider = ({
  job,
  children,
}: {
  job: JobData;
  children: React.ReactNode;
}) => {
  return <JobContext.Provider value={job}>{children}</JobContext.Provider>;
};

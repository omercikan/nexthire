import { JobData } from "./jobDetail";

interface RelatedJobs {
  category: string;
  employer: { companyName: string; profilePhoto: string; _id: string };
  employerId: string;
  experience: string;
  jobTitle: string;
  workType: string;
  _id: string;
}

export interface ApplicationData {
  hasApplied: boolean;
  job: Omit<JobData, "location">;
  relatedJobs: RelatedJobs[];
}

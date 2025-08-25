import { EmployerOpenJobs } from "./auth/employer/open-jobs.types";

//? Job detail page top intro section interfaces ?//
export interface JobIntroInterface {
  data: Pick<
    EmployerOpenJobs,
    | "jobTitle"
    | "modeOfWork"
    | "location"
    | "applicationDeadlineDate"
    | "category"
    | "positionLevel"
    | "datePosted"
    | "postId"
  > & {
    companyLogo: string;
    companyName: string;
    serviceArea: string;
    numberOfEmployees: string;
  };
  isLoading: boolean;
}

//? Job detail page top intro right section types ?//
export type JobIntroRightSection = Pick<
  EmployerOpenJobs,
  "jobTitle" | "postId" | "location" | "applicationDeadlineDate"
> & {
  companyLogo: string;
  companyName: string;
  numberOfEmployees: string;
  isLoading: boolean;
};

//? Job detail page job data interface ?//
export interface JobData extends EmployerOpenJobs {
  companyLogo: string;
  companyName: string;
  serviceArea: string;
  companyId: string;
  numberOfEmployees: string;
  foundedData: string;
  phoneNumber: string;
  email: string;
  websiteUrl: string;
  socials: { url: string }[];
  companyLocation: string;
}

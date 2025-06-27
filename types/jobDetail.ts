import { EmployerOpenJobs } from ".";

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

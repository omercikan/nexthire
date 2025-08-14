/**
 * @description the interface of the job opened by the employer
 */

import { Timestamp } from "firebase/firestore";

type ExperienceTime =
  | "Deneyimli"
  | "Deneyimsiz"
  | "1 Yıl"
  | "2 Yıl"
  | "3 Yıl"
  | "4 Yıl"
  | "5 Yıl"
  | "5+ Yıl";

export interface EmployerOpenJobs {
  postId: string;
  jobTitle: string;
  jobAbout: string;
  category: string;
  modeOfWork: string;
  workModel: string;
  positionLevel: string;
  educationLevel: string[];
  experienceTime: ExperienceTime;
  applicationDeadlineDate: string;
  location: string;
  datePosted: Timestamp;
  additionalQuestions: JobPostingAdditionalQuestions;
  requirements: string[];
  responsibilities: string[];
}

export interface JobPostingAdditionalQuestions {
  isSelectAnswer: boolean;
  isTextAnswer: boolean;
  selectQuestions: {
    questionAnswers: string[];
    questionTitle: string;
  }[];
  textQuestions: {
    questionTitle: string;
  }[];
}

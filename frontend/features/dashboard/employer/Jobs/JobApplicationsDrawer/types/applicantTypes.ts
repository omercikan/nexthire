interface Resume {
  url: string;
  originalName: string;
  fileName: string;
  size: number;
}

export interface ScreeningQuestion {
  question: string;
  answer: string;
  knockout: boolean;
  knockoutAnswer?: string;
}

export interface ApplicantStatus {
  value:
    | "pending"
    | "reviewed"
    | "accepted"
    | "shortlisted"
    | "scheduled"
    | "rejected"
    | "auto_rejected"
    | "interviewed"
    | "hired";
  changedAt: Date;
}

export interface Applicant {
  _id: string;
  candidateId: string;
  employerId: string;
  interviewId: string;
  jobId: string;
  profilePhoto: string;
  city: string;
  fullname: string;
  title: string;
  lastWorkPlace: string;
  experienceTime: string;
  createdAt: Date;
  updatedAt: Date;
  resume: Resume;
  phone: string;
  email: string;
  screeningQuestions: ScreeningQuestion[];
  status: ApplicantStatus[];
  currentStatus: string;
}

export type CurrentApplication = Pick<
  Applicant,
  | "candidateId"
  | "interviewId"
  | "profilePhoto"
  | "fullname"
  | "title"
  | "lastWorkPlace"
  | "screeningQuestions"
  | "createdAt"
>;

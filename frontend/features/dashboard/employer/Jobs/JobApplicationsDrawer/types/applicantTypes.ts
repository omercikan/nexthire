interface Resume {
  url: string;
  originalName: string;
  fileName: string;
  size: number;
}

interface ScreeningQuestion {
  question: string;
  answer: string;
  knockout: boolean;
  knockoutAnswer?: string;
}

export interface ApplicantStatus {
  value:
    | "pending"
    | "reviewed"
    | "shortlisted"
    | "scheduled"
    | "rejected"
    | "auto_rejected";
  changedAt: Date;
}

export interface Applicant {
  _id: string;
  candidateId: string;
  profilePhoto: string;
  fullname: string;
  title: string;
  lastWorkPlace: string;
  experienceTime: string;
  createdAt: Date;
  resume: Resume;
  phone: string;
  email: string;
  screeningQuestions: ScreeningQuestion[];
  status: ApplicantStatus[];
}

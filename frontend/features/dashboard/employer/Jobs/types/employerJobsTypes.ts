import { ApplicationMethod } from "@/shared/types/jobDetail";

interface ScreeningQuestion {
  id: string;
  question: string;
  type: string;
  options: string[];
  required: boolean;
  knockout: boolean;
}

export interface Job {
  _id: string;
  employerId: string;
  jobDescription: string;
  jobTitle: string;
  minSalary: string;
  maxSalary: string;
  experience: string;
  careerLevel: string;
  category: string;
  workType: string;
  gender: string;
  salaryPeriod: string;
  educationLevel: string;
  jobLocation: string;
  applicationMethod: ApplicationMethod;
  applicationAddress: string;
  introductionUrl: string;
  screeningQuestions: ScreeningQuestion[];
  status: "draft" | "published" | "passive";
  publishedAt: Date;
  expiresAt: string;
  createdAt: string;
  updatedAt: string;
  views: number;
  department: string;
  applicants: number;
}

export interface JobStats {
  total: number;
  totalApplications: number;
  published: number;
  passive: number;
  draft: number;
}

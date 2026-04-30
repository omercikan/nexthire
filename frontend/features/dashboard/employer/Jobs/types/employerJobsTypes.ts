export interface JobSummary {
  _id: string;
  jobTitle: string;
  category: string;
  workType: string;
  status: string;
  createdAt: Date;
  location: string;
  applicants: number;
}

export interface JobStats {
  total: number;
  totalApplications: number;
  published: number;
  passive: number;
  draft: number;
}

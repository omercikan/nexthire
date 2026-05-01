export interface JobSummary {
  _id: string;
  jobTitle: string;
  category: string;
  workType: string;
  status: "draft" | "published" | "passive";
  createdAt: Date;
  location: string;
  applicants: number;
  department: string;
}

export interface JobStats {
  total: number;
  totalApplications: number;
  published: number;
  passive: number;
  draft: number;
}

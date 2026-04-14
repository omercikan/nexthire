interface Stats {
  totalJobs: number;
  totalJobsDelta: number;
  activeJobs: number;
  activeListingsDelta: number;
  totalApplications: number;
  thisMonthApplications: number;
  newApplicants: number;
  newApplicantsDelta: number;
  scheduledInterviews: number;
  scheduledInterviewsDelta: number;
}

interface ApplicantTrends {
  month: string;
  applications: number;
}

interface JobPerformance {
  job: string;
  views: number;
  applications: number;
}

interface RecentActivity {
  fullname: string;
  jobTitle: string;
  status: string | undefined;
  updatedAt: Date;
}

interface EmployerOverviewResponse {
  stats: Stats;
  applicantTrends: ApplicantTrends[];
  jobPerformance: JobPerformance[];
  recentActivity: RecentActivity[];
}

export type {
  Stats,
  EmployerOverviewResponse,
  JobPerformance,
  RecentActivity,
  ApplicantTrends,
};

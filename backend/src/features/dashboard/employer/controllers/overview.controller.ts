import { Request, Response, NextFunction } from "express";
import { EmployerOverviewService } from "../services/overview.service";

const {
  totalJobs,
  activeJobs,
  totalApplications,
  newApplicants,
  scheduledInterviews,
  applicantTrendsPipeline,
  jobPerformancePipeline,
  formatApplicantTrends,
  recentActivity,
  formatRecentActivity,
} = new EmployerOverviewService();

export class OverviewController {
  async getEmployerOverview(req: Request, res: Response, next: NextFunction) {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    try {
      const [
        [totalJobsData, thisMonthJobs, lastMonthJobs],
        [activeJobsData, activatedJobs, deactivatedJobs],
        [totalApplicationsData, thisMonthApplications],
        [newApplicantsData, previousWeekApplicants],
        [scheduledInterviewsData, lastWeekScheduledInterviews],
        applicantTrendResults,
        jobPerformance,
        recentActivityResults,
      ] = await Promise.all([
        totalJobs(userId),
        activeJobs(userId),
        totalApplications(userId),
        newApplicants(userId),
        scheduledInterviews(userId),
        applicantTrendsPipeline(userId),
        jobPerformancePipeline(userId),
        recentActivity(userId),
      ]);

      const formattedRecentActivity = formatRecentActivity(
        recentActivityResults,
      );

      const applicantTrends = formatApplicantTrends(applicantTrendResults);

      const totalJobsDelta = thisMonthJobs - lastMonthJobs;
      const activeListingsDelta = activatedJobs - deactivatedJobs;
      const newApplicantsDelta = newApplicantsData - previousWeekApplicants;
      const scheduledInterviewsDelta =
        scheduledInterviewsData - lastWeekScheduledInterviews;

      return res.json({
        totalJobs: totalJobsData,
        totalJobsDelta,
        activeJobs: activeJobsData,
        activeListingsDelta,
        totalApplications: totalApplicationsData,
        thisMonthApplications,
        newApplicants: newApplicantsData,
        newApplicantsDelta,
        scheduledInterviews: scheduledInterviewsData,
        scheduledInterviewsDelta,
        applicantTrends,
        jobPerformance,
        recentActivity: formattedRecentActivity,
      });
    } catch (error) {
      next(error);
    }
  }
}

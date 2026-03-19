/**
 * @description the interface of the job opened by the employer
 */

export interface Job {
  _id: string;
  employerId: string;
  jobDescription: string;
  jobTitle: string;
  minSalary: string;
  maxSalary: string;
  experience: string;
  careerLevel: string;
  introductionUrl: string;
  category: string;
  workType: string;
  gender: string;
  salaryPeriod: string;
  educationLevel: string;
  applicationMethod: string;
  applicationAddress: string;
  createdAt: string;
  updatedAt: string;
}

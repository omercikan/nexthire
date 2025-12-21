import * as z from "zod";

export const createJobSchema = z
  .object({
    jobTitle: z.string().nonempty("Job title is required"),

    jobDescription: z
      .string()
      .nonempty(
        "Please provide a detailed job description and responsibilities"
      ),

    category: z.string().nonempty("Please select a job category"),

    workType: z.string().nonempty("Please select the employment type"),

    gender: z.string().nonempty("Please select a gender preference"),

    applicationMethod: z
      .string()
      .nonempty("Please select an application method"),

    applicationAddress: z.string().optional(),

    salaryPeriod: z.string().nonempty("Please select the salary period"),

    minSalary: z
      .string()
      .nonempty("Minimum salary is required")
      .refine(
        (val) => !val.startsWith("-"),
        "Minimum salary must be zero or greater"
      ),

    maxSalary: z
      .string()
      .nonempty("Maximum salary is required")
      .refine(
        (val) => !val.startsWith("-"),
        "Maximum salary must be zero or greater"
      ),

    experience: z
      .string()
      .nonempty("Please specify the required experience level"),

    careerLevel: z
      .string()
      .nonempty(
        "Please specify the appropriate career level for this position"
      ),

    educationLevel: z
      .string()
      .nonempty("Please select the required education level"),

    introductionUrl: z.string(),
  })
  .refine(
    (val) =>
      val.applicationMethod === "NextHire" ||
      (val.applicationAddress && val.applicationAddress.trim() !== ""),
    {
      error:
        "A valid application address must be provided based on the selected application method",
      path: ["applicationAddress"],
    }
  )
  .refine((val) => Number(val.minSalary) <= Number(val.maxSalary), {
    error: "The minimum salary cannot exceed the maximum salary",
    path: ["minSalary"],
  })
  .refine((val) => Number(val.maxSalary) >= Number(val.minSalary), {
    error: "The maximum salary cannot be lower than the minimum salary",
    path: ["maxSalary"],
  });

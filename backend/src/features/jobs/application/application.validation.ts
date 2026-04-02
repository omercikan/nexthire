import { z } from "zod";

export const applicationSchema = z.object({
  userId: z.string().min(1),
  employerId: z.string().min(1),
  jobId: z.string().min(1),

  selectedResumeName: z.string().min(1),
  removedResumeNames: z.array(z.string()).default([]),
  applicationData: z.object({
    email: z.email(),
    phone: z.string().min(1),
    screeningQuestions: z
      .array(
        z.object({
          question: z.string(),
          answer: z.union([z.string(), z.array(z.string())]),
        }),
      )
      .optional(),
  }),
});

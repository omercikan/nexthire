import { z } from "zod";

export const createInterviewSchema = z.object({
  candidateId: z.string().min(1, "Candidate ID is required"),

  positionId: z.string().optional(),

  scheduledAt: z.string().min(1, "Scheduled date is required"),

  type: z.enum(["online", "in_person"], {
    error: "Type must be either online or in_person",
  }),

  meetingLink: z.url("Invalid meeting link").optional().nullable(),

  location: z.string().optional(),

  positionTitle: z.string().min(1, "Position title is required"),

  notes: z.string().optional(),
});

export type CreateInterviewDTO = z.infer<typeof createInterviewSchema>;

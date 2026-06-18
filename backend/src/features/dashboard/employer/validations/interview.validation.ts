import { z } from "zod";

export const createInterviewSchema = z
  .object({
    candidateId: z.string().min(1, "Candidate ID is required"),

    positionId: z.string().optional(),

    scheduledAt: z.string().min(1, "Scheduled date is required"),

    scheduledTime: z.string().min(1, "Scheduled time is required"),

    type: z.enum(["online", "in_person"], {
      error: "Type must be either online or in_person",
    }),

    meetingLink: z.url("Invalid meeting link").optional().nullable(),

    location: z.string().optional().nullable(),

    positionTitle: z.string().min(1, "Position title is required"),

    notes: z.string().nullable().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.type === "online" && !data.meetingLink) {
      ctx.addIssue({
        code: "custom",
        message: "Meeting link is required for online interviews",
        path: ["meetingLink"],
      });
    }

    if (data.type === "in_person" && !data.location) {
      ctx.addIssue({
        code: "custom",
        message: "Location is required for in-person interviews",
        path: ["location"],
      });
    }
  });

export type CreateInterviewDTO = z.infer<typeof createInterviewSchema>;

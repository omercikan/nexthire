import { z } from "zod";
import { objectIdSchema } from "./common";

export const createInterviewSchema = z
  .object({
    candidateId: objectIdSchema,

    positionId: objectIdSchema.optional(),

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

const dateStringSchema = z.string().refine((val) => !isNaN(Date.parse(val)), {
  message: "Invalid date format",
});

const timeStringSchema = z
  .string()
  .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format (expected HH:mm)");

export const updateInterviewSchema = z
  .object({
    candidateId: objectIdSchema,
    positionId: objectIdSchema,
    scheduledAt: dateStringSchema,
    scheduledTime: timeStringSchema,
    type: z.enum(["online", "in_person"]),
    meetingLink: z.url("Please enter a valid URL"),
    location: z.string().min(1, "Location cannot be empty"),
    positionTitle: z.string().min(1, "Position title cannot be empty"),
    notes: z.string().max(1000, "Notes must be at most 1000 characters"),
  })
  .partial()
  .strict()
  .refine(
    (data) => {
      if (data.type === "online" && data.meetingLink === undefined) {
        return true;
      }
      return true;
    },
    { message: "" },
  )
  .refine(
    (data) => {
      if (data.type === "online" && data.location !== undefined) {
        return false;
      }
      if (data.type === "in_person" && data.meetingLink !== undefined) {
        return false;
      }
      return true;
    },
    {
      message:
        "If interview type is 'online', location must not be sent; if 'in_person', meetingLink must not be sent",
      path: ["type"],
    },
  )
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided for update",
  });

export const interviewParamsSchema = z.object({
  interviewId: objectIdSchema,
});

export type UpdateInterviewDTO = z.infer<typeof updateInterviewSchema>;
export type CreateInterviewDTO = z.infer<typeof createInterviewSchema>;
export type InterviewParamsDTO = z.infer<typeof interviewParamsSchema>;

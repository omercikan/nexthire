import { Request, Response, NextFunction } from "express";
import { CreateInterviewRequest } from "../types/interview.types";
import { User } from "../../../../shared/models/User";
import Interview from "../../../../shared/models/Interviews";
import { Application } from "../../../../shared/models/Application";
import { publisher } from "../../../../queues/publisher";

class InterviewController {
  async createInterview(
    req: Request<{}, {}, CreateInterviewRequest>,
    res: Response,
    next: NextFunction,
  ) {
    const data = req.body;
    const interviewerId = req.user.id;

    try {
      const [candidate, employer] = await Promise.all([
        User.findById(data.candidateId),
        User.findById(interviewerId),
      ]);

      if (!candidate || !employer) {
        res.status(404).json({ message: "Candidate or Employer not found" });
        return;
      }

      const [interview, application] = await Promise.all([
        Interview.create({
          candidateId: data.candidateId,
          interviewerId,

          scheduledAt: data.scheduledAt,
          time: data.time,
          type: data.type,
          meetingLink: data.meetingLink,
          location: data.location,

          positionId: data.positionId,
          positionTitle: data.positionTitle,
          notes: data.notes,

          statusHistory: [{ status: "scheduled", changedBy: interviewerId }],
        }),
        Application.updateOne(
          { candidateId: candidate.id, jobId: data.positionId },
          {
            $push: { status: { value: "scheduled", changedAt: new Date() } },
            $set: { currentStatus: "scheduled" },
          },
        ),
      ]);

      await publisher("interview:create", {
        candidateEmail: "omercikan37@gmail.com",
        interviewerEmail: employer.email,
        candidateName: candidate.fullname,
        interviewerName: employer.fullname,
        ...data,
      });

      res.status(201).json(interview);
    } catch (error) {
      next(error);
    }
  }
}

export const interviewController = new InterviewController();

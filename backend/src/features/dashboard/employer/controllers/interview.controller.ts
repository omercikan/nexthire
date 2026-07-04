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

      const interview = await Interview.create({
        candidateId: data.candidateId,
        interviewerId,

        scheduledAt: data.scheduledAt,
        scheduledTime: data.scheduledTime,
        type: data.type,
        meetingLink: data.meetingLink,
        location: data.location,

        positionId: data.positionId,
        positionTitle: data.positionTitle,
        notes: data.notes,

        statusHistory: [{ status: "scheduled", changedBy: interviewerId }],
      });

      await Application.updateOne(
        { candidateId: candidate.id, jobId: data.positionId },
        {
          $push: { status: { value: "scheduled", changedAt: new Date() } },
          $set: { currentStatus: "scheduled", interviewId: interview._id },
        },
      );

      await publisher("interview:create", {
        candidateEmail: candidate.email,
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

  async getInterview(
    req: Request<{ interviewId: string }>,
    res: Response,
    next: NextFunction,
  ) {
    const { interviewId } = req.params;
    const interviewerId = req.user.id;

    try {
      const interview = await Interview.findOne({
        _id: interviewId,
        interviewerId,
      }).select(
        "scheduledAt scheduledTime type meetingLink location positionId positionTitle notes",
      );

      if (!interview) {
        res.status(404).json({ message: "Interview not found" });
        return;
      }

      res.status(200).json(interview);
    } catch (error) {
      next(error);
    }
  }

  async updateInterview(
    req: Request<{ interviewId: string }, {}>,
    res: Response,
    next: NextFunction,
  ) {
    const interviewerId = req.user.id;
    const { interviewId } = req.params;
    const updateData = req.body;

    try {
      const interview = await Interview.findOneAndUpdate(
        { _id: interviewId, interviewerId },
        updateData,
        { new: true },
      )
        .select("-_id -__v -status -statusHistory -interviewerId")
        .populate("candidateId", "email fullname")
        .populate("interviewerId", "email fullname");

      if (!interview) {
        return res
          .status(404)
          .json({ success: false, message: "Interview not found" });
      }

      const mailContext = {
        action: "update",
        candidateSubject: "NextHire - Mülakatınız Güncellendi",
        interviewerSubject: "NextHire - Mülakat Güncellendi",
        positionTitle: interview.positionTitle,
        scheduledAt: interview.scheduledAt,
        scheduledTime: interview.scheduledTime,
        type: interview.type,
        meetingLink: interview.meetingLink,
        location: interview.location,
        notes: interview.notes,
        year: new Date().getFullYear(),
      };

      await publisher("interview:events", {
        candidateEmail: interview.candidateId.email,
        interviewerEmail: interview.interviewerId.email,
        candidateName: interview.candidateId.fullname,
        interviewerName: interview.interviewerId.fullname,
        ...mailContext,
      });

      return res.json({
        success: true,
        data: interview,
        message: "The interview has been successfully updated.",
      });
    } catch (error) {
      next(error);
    }
  }
}

export const interviewController = new InterviewController();

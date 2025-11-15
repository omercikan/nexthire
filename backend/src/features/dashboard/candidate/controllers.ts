import { NextFunction, Request, Response } from "express";
import { Resume } from "../../../shared/models/Resume";
import { fixFileName } from "../../../shared/utils/fixFileName";

class CandidateDashboardEvents {
  async uploadResume(req: Request, res: Response, next: NextFunction) {
    const file = req.file;
    const { userId } = req.body;

    if (!file) return;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    try {
      await Resume.create({
        originalName: fixFileName(file.originalname),
        fileName: file.filename,
        fileUrl: file.path,
        size: file.size,
        userId,
      });

      res.status(201).json({ message: "Resume successfully uploaded" });
    } catch (error) {
      next(error);
    }
  }

  async getResumes(req: Request, res: Response, next: NextFunction) {
    const { userId } = req.params;

    try {
      const resumes = await Resume.find({ userId }).sort({ createdAt: "desc" });

      res.json(resumes);
    } catch (error) {
      next(error);
    }
  }
}

export const CandidateDashboard = new CandidateDashboardEvents();

import { NextFunction, Request, Response } from "express";
import { Resume } from "../../../../shared/models/Resume";
import { fixFileName } from "../../../../shared/utils/fixFileName";
import { publisher } from "../../../../queues/publisher";

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

  async deleteResumes(req: Request, res: Response, next: NextFunction) {
    const { resumeIDs, publicId } = req.body;

    try {
      const result = await Resume.deleteMany({ _id: resumeIDs });

      await publisher("deleteResumesQueue", publicId);

      res.json({
        message: `Deleted ${result.deletedCount} resume${result.deletedCount > 1 ? "s" : ""}`,
      });
    } catch (error) {
      next(error);
    }
  }

  async renameResume(req: Request, res: Response, next: NextFunction) {
    const { fileID, newName } = req.body;

    try {
      const updatedResume = await Resume.findByIdAndUpdate(
        fileID,
        { originalName: newName.trim() },
        { new: true }
      );

      if (!updatedResume) {
        return res.status(404).json({ message: "Resume not found." });
      }

      res.json({ message: "Resume successfully renamed." });
    } catch (error) {
      next(error);
    }
  }

  async replaceResume(req: Request, res: Response, next: NextFunction) {
    const { fileId, publicId } = req.body;
    const file = req.file;

    try {
      if (file) {
        await publisher("replaceResumeQueue", { fileId, publicId, file });

        res.status(200).json({ message: "Resume successfully modified", file });
      }
    } catch (error) {
      next(error);
    }
  }
}

export const CandidateDashboard = new CandidateDashboardEvents();

import { Request, Response, NextFunction } from "express";

export const fileValidation =
  () => (req: Request, res: Response, next: NextFunction) => {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "File missing" });
    }

    if (file.mimetype !== "application/pdf") {
      return res.status(400).json({ message: "File type must be PDF." });
    }

    if (file.size > 3 * 1024 * 1024) {
      return res
        .status(400)
        .json({ message: "File size can be at least 3 MB." });
    }

    next();
  };

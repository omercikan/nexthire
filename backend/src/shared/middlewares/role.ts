import { Request, Response, NextFunction } from "express";

export const roleMiddleware =
  (role: "employer" | "candidate" | "admin") =>
  (req: Request, res: Response, next: NextFunction) => {
    const currentRole = req.user?.role;

    try {
      if (role !== currentRole) {
        return res
          .status(403)
          .json({ message: "You do not have permission for this operation." });
      }

      next();
    } catch (error) {
      next(error);
    }
  };

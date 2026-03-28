import { NextFunction, Request, Response } from "express";
import { applicationSchema } from "./application.validation";
import z from "zod";

export const validateApplication = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = applicationSchema.parse(JSON.parse(req.body.data));
    req.body.data = result;
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json(
        error.issues.map(({ message, path }) => {
          return { message, path: path[0] };
        }),
      );
    }

    next(error);
  }
};

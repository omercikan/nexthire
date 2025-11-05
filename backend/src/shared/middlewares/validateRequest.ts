import { NextFunction, Request, Response } from "express";
import z, { ZodType } from "zod";

export const validateRequest =
  (schema: ZodType, property: "body" | "query" | "params" = "body") =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req[property]);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json(
          error.issues.map(({ message, path }) => {
            return { message, path: path[0] };
          })
        );
      }
      next(error);
    }
  };

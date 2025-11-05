import { NextFunction, Request, Response } from "express";
import logger from "../utils/logger";

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  res
    .status(Number(err.cause) || 500)
    .json({ message: err.message || "Internal Server Error" });
  logger.error({ message: err.message });
  next();
};

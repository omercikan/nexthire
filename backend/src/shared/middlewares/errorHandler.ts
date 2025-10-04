import { NextFunction, Request, Response } from "express";

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  res
    .status(Number(err.cause))
    .json({ message: err.message || "Internal Server Error" });
  next();
};

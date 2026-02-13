import config from "../../config";
import express, { Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

export const applyGlobalMiddlewares = (app: Application) => {
  // Security
  app.use(cors({ credentials: true, origin: config.client_url }));

  // Parsing
  app.use(express.json());
  app.use(cookieParser());
};

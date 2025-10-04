import express from "express";
import cors from "cors";
import { errorHandler } from "./shared/middlewares/errorHandler.ts";

// express app
const app = express();

// global middleware
app.use(express.json());
app.use(cors());

// global error handler after requests
app.use(errorHandler);

export default app;

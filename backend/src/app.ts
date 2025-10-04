import express from "express";
import cors from "cors";
import authCandidateRoutes from "./features/auth/candidate/routes/authCandidateRoutes.ts";
import { errorHandler } from "./shared/middlewares/errorHandler.ts";

// express app
const app = express();

// global middleware
app.use(express.json());
app.use(cors());

app.use("/api/auth", authCandidateRoutes);

// global error handler after requests
app.use(errorHandler);

export default app;

import express from "express";
import resumeRoutes from "./resume.route";

const router = express.Router();

router.use("/", resumeRoutes);

export default router;

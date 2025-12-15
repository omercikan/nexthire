import express from "express";
import resumeRoutes from "./resume.route";
import profileRoutes from "./profile.route";

const router = express.Router();

router.use("/", resumeRoutes);
router.use("/", profileRoutes);

export default router;

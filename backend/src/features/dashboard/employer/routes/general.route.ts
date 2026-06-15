import express from "express";
import jobRoutes from "./job.routes";
import profileRoutes from "./profile.routes";
import overviewRoutes from "./overview.routes";
import { applicantRouter } from "./applicant.routes";
import interviewRouter from "./interview.routes";
import { authMiddleware } from "../../../../shared/middlewares/auth";
import { roleMiddleware } from "../../../../shared/middlewares/role";

const router = express.Router();

router.use("/", jobRoutes);

router.use("/", authMiddleware, roleMiddleware("employer"), profileRoutes);

router.use("/", overviewRoutes);

router.use("/", applicantRouter);

router.use("/", interviewRouter);

export default router;

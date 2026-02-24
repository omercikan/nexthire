import express from "express";
import jobRoutes from "./job.routes";
import profileRoutes from "./profile.routes";
import { authMiddleware } from "../../../../shared/middlewares/auth";
import { roleMiddleware } from "../../../../shared/middlewares/role";

const router = express.Router();

router.use("/", jobRoutes);

router.use("/", authMiddleware, roleMiddleware("employer"), profileRoutes);

export default router;

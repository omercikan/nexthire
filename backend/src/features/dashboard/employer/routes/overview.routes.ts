import express from "express";
import { authMiddleware } from "../../../../shared/middlewares/auth";
import { OverviewController } from "../controllers/overview.controller";
import { roleMiddleware } from "../../../../shared/middlewares/role";

const router = express.Router();

const { getEmployerOverview } = new OverviewController();

router.get(
  "/overview",
  authMiddleware,
  roleMiddleware("employer"),
  getEmployerOverview,
);

export default router;

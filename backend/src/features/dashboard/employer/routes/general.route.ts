import express from "express";
import jobRoutes from "./job.routes";

const router = express.Router();

router.use("/", jobRoutes);

export default router;

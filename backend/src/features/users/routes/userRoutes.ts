import express from "express";
import { getUser } from "../controllers/UserController.ts";
import { authMiddleware } from "../../../shared/middlewares/auth.ts";
const router = express.Router();

router.get("/me", authMiddleware, getUser);

export default router;

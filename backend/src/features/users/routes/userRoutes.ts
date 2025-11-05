import express from "express";
import { getUser } from "../controllers/UserController";
import { authMiddleware } from "../../../shared/middlewares/auth";
const router = express.Router();

router.get("/me", authMiddleware, getUser);

export default router;

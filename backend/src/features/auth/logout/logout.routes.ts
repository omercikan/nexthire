import express from "express";
import { LogoutController } from "./logut.controller";
import { limitter } from "../../../shared/middlewares/limitter";

const router = express.Router();

router.delete("/logout", limitter(60 * 1000, 5), LogoutController.accountLogout);

export default router;

import { Router } from "express";
import { createCandidateController } from "../controllers/CandidateController.ts";
import { validateRequest } from "../../../../shared/middlewares/validateRequest.ts";
import { candidateUserSchema } from "../validators/candidateRequestValidator.ts";
import { limitter } from "../../../../shared/middlewares/limitter.ts";

const router = Router();

router.post(
  "/register-candidate",
  limitter(15 * 60 * 1000, 5),
  validateRequest(candidateUserSchema),
  createCandidateController
);

export default router;

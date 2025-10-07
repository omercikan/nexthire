import { Router } from "express";
import { validateRequest } from "../../../../shared/middlewares/validateRequest.ts";
import { candidateUserSchema } from "../validators/candidateRequestValidator.ts";
import { limitter } from "../../../../shared/middlewares/limitter.ts";
import {
  createCandidate,
  loginCandidate,
} from "../controllers/CandidateController.ts";

const router = Router();

router.post(
  "/register-candidate",
  limitter(15 * 60 * 1000, 5),
  validateRequest(candidateUserSchema),
  createCandidate
);

router.post(
  "/login-candidate",
  limitter(15 * 60 * 1000, 5),
  validateRequest(
    candidateUserSchema.omit({
      fullname: true,
    })
  ),
  loginCandidate
);
export default router;

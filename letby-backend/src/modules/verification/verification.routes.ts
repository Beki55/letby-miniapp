import { Router } from "express";
import { protect } from "../../middleware/auth.middleware.js";
import { validate } from "../../middleware/validate.middleware.js";
import { getStatus, submitVerification } from "./verification.controller.js";
import { submitVerificationSchema } from "./verification.validator.js";

const router = Router();

router.post("/submit", protect, validate(submitVerificationSchema), submitVerification);
router.get("/status", protect, getStatus);

export default router;

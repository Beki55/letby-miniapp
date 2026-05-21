import { Router } from "express";
import { protect } from "../../middleware/auth.middleware.js";
import { authRateLimit } from "../../middleware/rateLimit.middleware.js";
import { validate } from "../../middleware/validate.middleware.js";
import { getMe, telegramAuth } from "./auth.controller.js";
import { telegramAuthSchema } from "./auth.validator.js";
const router = Router();
router.post("/telegram", authRateLimit, validate(telegramAuthSchema), telegramAuth);
router.get("/me", protect, getMe);
export default router;
//# sourceMappingURL=auth.routes.js.map
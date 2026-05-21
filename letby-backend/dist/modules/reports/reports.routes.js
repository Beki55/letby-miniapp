import { Router } from "express";
import { protect } from "../../middleware/auth.middleware.js";
import { validate } from "../../middleware/validate.middleware.js";
import { createReport } from "./reports.controller.js";
import { createReportSchema } from "./reports.validator.js";
const router = Router();
router.post("/", protect, validate(createReportSchema), createReport);
export default router;
//# sourceMappingURL=reports.routes.js.map
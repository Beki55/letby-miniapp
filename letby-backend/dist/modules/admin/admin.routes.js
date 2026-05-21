import { Router } from "express";
import { protect } from "../../middleware/auth.middleware.js";
import { validate } from "../../middleware/validate.middleware.js";
import { requireRole } from "../auth/auth.middleware.js";
import { UserRole } from "../../generated/prisma/enums.js";
import { getQueue, verifyUser } from "./admin.controller.js";
import { verifySellerSchema } from "./admin.validator.js";
const router = Router();
router.use(protect, requireRole(UserRole.ADMIN));
router.get("/queue", getQueue);
router.put("/verify/:userId", validate(verifySellerSchema), verifyUser);
export default router;
//# sourceMappingURL=admin.routes.js.map
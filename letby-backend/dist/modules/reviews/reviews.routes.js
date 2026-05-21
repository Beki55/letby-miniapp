import { Router } from "express";
import { protect } from "../../middleware/auth.middleware.js";
import { validate } from "../../middleware/validate.middleware.js";
import { createReview, listReviewsForSeller } from "./reviews.controller.js";
import { createReviewSchema } from "./reviews.validator.js";
const router = Router();
router.post("/", protect, validate(createReviewSchema), createReview);
router.get("/:sellerId", listReviewsForSeller);
export default router;
//# sourceMappingURL=reviews.routes.js.map
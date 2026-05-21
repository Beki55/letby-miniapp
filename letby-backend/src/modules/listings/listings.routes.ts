import { Router } from "express";
import { protect } from "../../middleware/auth.middleware.js";
import { validate, validateQuery } from "../../middleware/validate.middleware.js";
import {
  createListing,
  deleteListing,
  getListing,
  listListings,
  updateListing,
} from "./listings.controller.js";
import {
  createListingSchema,
  listListingsQuerySchema,
  updateListingSchema,
} from "./listings.validator.js";

const router = Router();

router.get("/", validateQuery(listListingsQuerySchema), listListings);
router.get("/:id", getListing);
router.post("/", protect, validate(createListingSchema), createListing);
router.put("/:id", protect, validate(updateListingSchema), updateListing);
router.delete("/:id", protect, deleteListing);

export default router;

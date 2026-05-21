import { asyncHandler } from "../../utils/asyncHandler.js";
import { UnauthorizedError } from "../../utils/errors.js";
import * as reviewsService from "./reviews.service.js";
export const createReview = asyncHandler(async (req, res) => {
    if (!req.user) {
        throw new UnauthorizedError();
    }
    const { sellerId, rating, comment } = req.body;
    const review = await reviewsService.createReview(req.user.userId, sellerId, rating, comment);
    res.status(201).json({ success: true, review });
});
export const listReviewsForSeller = asyncHandler(async (req, res) => {
    const reviews = await reviewsService.getReviewsForSeller(req.params.sellerId);
    res.json({ success: true, reviews });
});
//# sourceMappingURL=reviews.controller.js.map
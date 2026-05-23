import type { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { UnauthorizedError } from "../../utils/errors.js";
import { asRouteParam } from "../../utils/params.js";
import * as reviewsService from "./reviews.service.js";
import type { CreateReviewInput } from "./reviews.validator.js";

export const createReview = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    if (!req.user) {
      throw new UnauthorizedError();
    }

    const { sellerId, rating, comment } = req.body as CreateReviewInput;
    const review = await reviewsService.createReview(
      req.user.userId,
      sellerId,
      rating,
      comment
    );

    res.status(201).json({ success: true, review });
  }
);

export const listReviewsForSeller = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const reviews = await reviewsService.getReviewsForSeller(asRouteParam(req.params.sellerId as any));
    res.json({ success: true, reviews });
  }
);

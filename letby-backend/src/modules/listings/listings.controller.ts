import type { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { NotFoundError, UnauthorizedError } from "../../utils/errors.js";
import { asRouteParam } from "../../utils/params.js";
import * as listingsService from "./listings.service.js";
import type {
  CreateListingInput,
  ListListingsQuery,
  UpdateListingInput,
} from "./listings.validator.js";

export const listListings = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const query = req.query as unknown as ListListingsQuery;
    const result = await listingsService.searchListings(query);

    res.json({ success: true, ...result });
  }
);

export const getListing = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const listing = await listingsService.getListingById(asRouteParam(req.params.id));

    if (!listing) {
      throw new NotFoundError("Listing not found");
    }

    res.json({ success: true, listing });
  }
);

export const createListing = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    if (!req.user) {
      throw new UnauthorizedError();
    }

    const listing = await listingsService.createListing(
      req.user.userId,
      req.body as CreateListingInput
    );

    res.status(201).json({ success: true, listing });
  }
);

export const updateListing = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    if (!req.user) {
      throw new UnauthorizedError();
    }

    const listing = await listingsService.updateListing(
      asRouteParam(req.params.id),
      req.user.userId,
      req.body as UpdateListingInput
    );

    if (!listing) {
      throw new NotFoundError("Listing not found or not owned by you");
    }

    res.json({ success: true, listing });
  }
);

export const deleteListing = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    if (!req.user) {
      throw new UnauthorizedError();
    }

    const deleted = await listingsService.deleteListing(
      asRouteParam(req.params.id),
      req.user.userId
    );

    if (!deleted) {
      throw new NotFoundError("Listing not found or not owned by you");
    }

    res.json({ success: true, message: "Listing deleted" });
  }
);

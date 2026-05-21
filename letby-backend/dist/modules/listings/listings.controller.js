import { asyncHandler } from "../../utils/asyncHandler.js";
import { NotFoundError, UnauthorizedError } from "../../utils/errors.js";
import * as listingsService from "./listings.service.js";
export const listListings = asyncHandler(async (req, res) => {
    const query = req.query;
    const result = await listingsService.searchListings(query);
    res.json({ success: true, ...result });
});
export const getListing = asyncHandler(async (req, res) => {
    const listing = await listingsService.getListingById(req.params.id);
    if (!listing) {
        throw new NotFoundError("Listing not found");
    }
    res.json({ success: true, listing });
});
export const createListing = asyncHandler(async (req, res) => {
    if (!req.user) {
        throw new UnauthorizedError();
    }
    const listing = await listingsService.createListing(req.user.userId, req.body);
    res.status(201).json({ success: true, listing });
});
export const updateListing = asyncHandler(async (req, res) => {
    if (!req.user) {
        throw new UnauthorizedError();
    }
    const listing = await listingsService.updateListing(req.params.id, req.user.userId, req.body);
    if (!listing) {
        throw new NotFoundError("Listing not found or not owned by you");
    }
    res.json({ success: true, listing });
});
export const deleteListing = asyncHandler(async (req, res) => {
    if (!req.user) {
        throw new UnauthorizedError();
    }
    const deleted = await listingsService.deleteListing(req.params.id, req.user.userId);
    if (!deleted) {
        throw new NotFoundError("Listing not found or not owned by you");
    }
    res.json({ success: true, message: "Listing deleted" });
});
//# sourceMappingURL=listings.controller.js.map
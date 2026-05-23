import type { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { NotFoundError } from "../../utils/errors.js";
import { getSellerProfile } from "./users.service.js";
import { asRouteParam } from "../../utils/params.js";

export const getUser = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const profile = await getSellerProfile(asRouteParam(req.params.id as any));

    if (!profile) {
      throw new NotFoundError("User not found");
    }

    res.json({ success: true, ...profile });
  }
);

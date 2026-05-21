import type { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { NotFoundError } from "../../utils/errors.js";
import { getSellerProfile } from "./users.service.js";

export const getUser = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const profile = await getSellerProfile(req.params.id!);

    if (!profile) {
      throw new NotFoundError("User not found");
    }

    res.json({ success: true, ...profile });
  }
);

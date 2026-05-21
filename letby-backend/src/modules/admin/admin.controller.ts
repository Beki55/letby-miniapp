import type { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { NotFoundError } from "../../utils/errors.js";
import { asRouteParam } from "../../utils/params.js";
import * as adminService from "./admin.service.js";
import type { VerifySellerInput } from "./admin.validator.js";

export const getQueue = asyncHandler(
  async (_req: Request, res: Response): Promise<void> => {
    const queue = await adminService.getVerificationQueue();
    res.json({ success: true, queue });
  }
);

export const verifyUser = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { approved } = req.body as VerifySellerInput;
    const result = await adminService.verifySeller(
      asRouteParam(req.params.userId),
      approved
    );

    if (!result) {
      throw new NotFoundError("Verification submission not found");
    }

    res.json({ success: true, submission: result });
  }
);

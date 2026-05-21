import type { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { UnauthorizedError } from "../../utils/errors.js";
import * as verificationService from "./verification.service.js";
import type { SubmitVerificationInput } from "./verification.validator.js";

export const submitVerification = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    if (!req.user) {
      throw new UnauthorizedError();
    }

    const body = req.body as SubmitVerificationInput;
    const submission = await verificationService.submitVerification(
      req.user.userId,
      body
    );

    res.status(201).json({ success: true, submission });
  }
);

export const getStatus = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    if (!req.user) {
      throw new UnauthorizedError();
    }

    const status = await verificationService.getVerificationStatus(req.user.userId);
    res.json({ success: true, status });
  }
);

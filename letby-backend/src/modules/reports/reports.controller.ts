import type { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { UnauthorizedError } from "../../utils/errors.js";
import * as reportsService from "./reports.service.js";
import type { CreateReportInput } from "./reports.validator.js";

export const createReport = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    if (!req.user) {
      throw new UnauthorizedError();
    }

    const { targetType, targetId, reason } = req.body as CreateReportInput;
    const report = await reportsService.createReport(
      req.user.userId,
      targetType,
      targetId,
      reason
    );

    res.status(201).json({ success: true, report });
  }
);

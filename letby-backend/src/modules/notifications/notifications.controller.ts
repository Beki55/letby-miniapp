import type { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { UnauthorizedError } from "../../utils/errors.js";
import { listNotifications } from "./notifications.service.js";

export const getNotifications = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    if (!req.user) {
      throw new UnauthorizedError();
    }

    const notifications = await listNotifications(req.user.userId);
    res.json({ success: true, notifications });
  }
);

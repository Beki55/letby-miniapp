import type { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { UnauthorizedError } from "../../utils/errors.js";
import { authenticateWithTelegram, getUserById } from "./auth.service.js";
import { NotFoundError } from "../../utils/errors.js";
import type { TelegramAuthInput } from "./auth.validator.js";

export const getMe = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    if (!req.user) {
      throw new UnauthorizedError();
    }

    const user = await getUserById(req.user.userId);
    if (!user) {
      throw new NotFoundError("User not found");
    }

    res.status(200).json({
      success: true,
      user,
    });
  }
);

export const telegramAuth = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { initData } = req.body as TelegramAuthInput;

    const result = await authenticateWithTelegram(initData);

    res.status(200).json({
      success: true,
      token: result.token,
      user: result.user,
    });
  }
);

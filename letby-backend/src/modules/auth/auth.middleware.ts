import type { NextFunction, Request, Response } from "express";
import type { UserRole } from "../../generated/prisma/enums.js";
import type { JwtUserPayload } from "../../types/auth.js";
import { UnauthorizedError } from "../../utils/errors.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { getSession } from "./auth.service.js";

export const requireRole =
  (...roles: UserRole[]) =>
  (req: Request, _res: Response, next: NextFunction): void => {
    const user = req.user as JwtUserPayload | undefined;

    if (!user || !roles.includes(user.role)) {
      next(new UnauthorizedError("Insufficient permissions"));
      return;
    }

    next();
  };

/** Ensures Redis session still exists (optional hard check). */
export const requireActiveSession = asyncHandler(
  async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    const user = req.user as JwtUserPayload | undefined;

    if (!user) {
      throw new UnauthorizedError();
    }

    const session = await getSession(user.userId);

    if (!session) {
      throw new UnauthorizedError("Session expired");
    }

    next();
  }
);

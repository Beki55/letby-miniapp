import type { NextFunction, Request, Response } from "express";
import type { UserRole } from "../../generated/prisma/enums.js";
export declare const requireRole: (...roles: UserRole[]) => (req: Request, _res: Response, next: NextFunction) => void;
/** Ensures Redis session still exists (optional hard check). */
export declare const requireActiveSession: (req: Request, res: Response, next: NextFunction) => void;
//# sourceMappingURL=auth.middleware.d.ts.map
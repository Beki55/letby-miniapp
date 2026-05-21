import { UnauthorizedError } from "../../utils/errors.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { getSession } from "./auth.service.js";
export const requireRole = (...roles) => (req, _res, next) => {
    const user = req.user;
    if (!user || !roles.includes(user.role)) {
        next(new UnauthorizedError("Insufficient permissions"));
        return;
    }
    next();
};
/** Ensures Redis session still exists (optional hard check). */
export const requireActiveSession = asyncHandler(async (req, _res, next) => {
    const user = req.user;
    if (!user) {
        throw new UnauthorizedError();
    }
    const session = await getSession(user.userId);
    if (!session) {
        throw new UnauthorizedError("Session expired");
    }
    next();
});
//# sourceMappingURL=auth.middleware.js.map
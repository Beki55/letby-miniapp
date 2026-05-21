import { UnauthorizedError } from "../utils/errors.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { verifyToken } from "../utils/jwt.js";
export const protect = asyncHandler(async (req, _res, next) => {
    const header = req.headers.authorization;
    if (!header?.startsWith("Bearer ")) {
        throw new UnauthorizedError("Missing or invalid authorization header");
    }
    const token = header.slice(7);
    try {
        req.user = verifyToken(token);
        next();
    }
    catch {
        throw new UnauthorizedError("Invalid or expired token");
    }
});
//# sourceMappingURL=auth.middleware.js.map
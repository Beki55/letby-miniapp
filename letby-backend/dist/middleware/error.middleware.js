import { AppError } from "../utils/errors.js";
import { env } from "../config/env.js";
export const errorHandler = (err, _req, res, _next) => {
    if (err instanceof AppError) {
        res.status(err.statusCode).json({
            success: false,
            message: err.message,
            code: err.code,
        });
        return;
    }
    console.error(err);
    res.status(500).json({
        success: false,
        message: env.NODE_ENV === "production"
            ? "Internal server error"
            : err instanceof Error
                ? err.message
                : "Internal server error",
    });
};
export const notFoundHandler = (_req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
    });
};
//# sourceMappingURL=error.middleware.js.map
export class AppError extends Error {
    statusCode;
    code;
    constructor(statusCode, message, code) {
        super(message);
        this.statusCode = statusCode;
        this.code = code;
        this.name = "AppError";
    }
}
export class UnauthorizedError extends AppError {
    constructor(message = "Unauthorized") {
        super(401, message, "UNAUTHORIZED");
    }
}
export class BadRequestError extends AppError {
    constructor(message = "Bad request") {
        super(400, message, "BAD_REQUEST");
    }
}
export class NotFoundError extends AppError {
    constructor(message = "Not found") {
        super(404, message, "NOT_FOUND");
    }
}
//# sourceMappingURL=errors.js.map
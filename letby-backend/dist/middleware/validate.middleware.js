import { BadRequestError } from "../utils/errors.js";
const formatIssues = (issues) => issues.map((issue) => issue.message).join("; ");
export const validate = (schema) => (req, _res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
        next(new BadRequestError(formatIssues(result.error.issues)));
        return;
    }
    req.body = result.data;
    next();
};
export const validateQuery = (schema) => (req, _res, next) => {
    const result = schema.safeParse(req.query);
    if (!result.success) {
        next(new BadRequestError(formatIssues(result.error.issues)));
        return;
    }
    req.query = result.data;
    next();
};
//# sourceMappingURL=validate.middleware.js.map
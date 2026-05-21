import { asyncHandler } from "../../utils/asyncHandler.js";
import { UnauthorizedError } from "../../utils/errors.js";
import * as reportsService from "./reports.service.js";
export const createReport = asyncHandler(async (req, res) => {
    if (!req.user) {
        throw new UnauthorizedError();
    }
    const { targetType, targetId, reason } = req.body;
    const report = await reportsService.createReport(req.user.userId, targetType, targetId, reason);
    res.status(201).json({ success: true, report });
});
//# sourceMappingURL=reports.controller.js.map
import { asyncHandler } from "../../utils/asyncHandler.js";
import { UnauthorizedError } from "../../utils/errors.js";
import * as verificationService from "./verification.service.js";
export const submitVerification = asyncHandler(async (req, res) => {
    if (!req.user) {
        throw new UnauthorizedError();
    }
    const body = req.body;
    const submission = await verificationService.submitVerification(req.user.userId, body);
    res.status(201).json({ success: true, submission });
});
export const getStatus = asyncHandler(async (req, res) => {
    if (!req.user) {
        throw new UnauthorizedError();
    }
    const status = await verificationService.getVerificationStatus(req.user.userId);
    res.json({ success: true, status });
});
//# sourceMappingURL=verification.controller.js.map
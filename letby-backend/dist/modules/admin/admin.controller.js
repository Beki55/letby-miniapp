import { asyncHandler } from "../../utils/asyncHandler.js";
import { NotFoundError } from "../../utils/errors.js";
import * as adminService from "./admin.service.js";
export const getQueue = asyncHandler(async (_req, res) => {
    const queue = await adminService.getVerificationQueue();
    res.json({ success: true, queue });
});
export const verifyUser = asyncHandler(async (req, res) => {
    const { approved } = req.body;
    const result = await adminService.verifySeller(req.params.userId, approved);
    if (!result) {
        throw new NotFoundError("Verification submission not found");
    }
    res.json({ success: true, submission: result });
});
//# sourceMappingURL=admin.controller.js.map
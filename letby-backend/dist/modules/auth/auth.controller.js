import { asyncHandler } from "../../utils/asyncHandler.js";
import { UnauthorizedError } from "../../utils/errors.js";
import { authenticateWithTelegram, getUserById } from "./auth.service.js";
import { NotFoundError } from "../../utils/errors.js";
export const getMe = asyncHandler(async (req, res) => {
    if (!req.user) {
        throw new UnauthorizedError();
    }
    const user = await getUserById(req.user.userId);
    if (!user) {
        throw new NotFoundError("User not found");
    }
    res.status(200).json({
        success: true,
        user,
    });
});
export const telegramAuth = asyncHandler(async (req, res) => {
    const { initData } = req.body;
    const result = await authenticateWithTelegram(initData);
    res.status(200).json({
        success: true,
        token: result.token,
        user: result.user,
    });
});
//# sourceMappingURL=auth.controller.js.map
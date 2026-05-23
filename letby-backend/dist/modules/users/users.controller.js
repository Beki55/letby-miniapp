import { asyncHandler } from "../../utils/asyncHandler.js";
import { NotFoundError } from "../../utils/errors.js";
import { getSellerProfile } from "./users.service.js";
import { asRouteParam } from "../../utils/params.js";
export const getUser = asyncHandler(async (req, res) => {
    const profile = await getSellerProfile(asRouteParam(req.params.id));
    if (!profile) {
        throw new NotFoundError("User not found");
    }
    res.json({ success: true, ...profile });
});
//# sourceMappingURL=users.controller.js.map
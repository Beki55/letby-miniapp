import { z } from "zod";
export const createReportSchema = z.object({
    targetType: z.enum(["listing", "user"]),
    targetId: z.string().min(1),
    reason: z.string().min(3).max(2000),
});
//# sourceMappingURL=reports.validator.js.map
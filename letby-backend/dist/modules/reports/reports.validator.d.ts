import { z } from "zod";
export declare const createReportSchema: z.ZodObject<{
    targetType: z.ZodEnum<{
        user: "user";
        listing: "listing";
    }>;
    targetId: z.ZodString;
    reason: z.ZodString;
}, z.core.$strip>;
export type CreateReportInput = z.infer<typeof createReportSchema>;
//# sourceMappingURL=reports.validator.d.ts.map
import { z } from "zod";
export declare const verifySellerSchema: z.ZodObject<{
    approved: z.ZodBoolean;
}, z.core.$strip>;
export type VerifySellerInput = z.infer<typeof verifySellerSchema>;
//# sourceMappingURL=admin.validator.d.ts.map
import { z } from "zod";
export declare const submitVerificationSchema: z.ZodObject<{
    nationalIdUrl: z.ZodString;
    selfieUrl: z.ZodString;
    phone: z.ZodString;
    telegramUsername: z.ZodString;
}, z.core.$strip>;
export type SubmitVerificationInput = z.infer<typeof submitVerificationSchema>;
//# sourceMappingURL=verification.validator.d.ts.map
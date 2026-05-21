import { z } from "zod";
export const submitVerificationSchema = z.object({
    nationalIdUrl: z.string().url(),
    selfieUrl: z.string().url(),
    phone: z.string().min(8),
    telegramUsername: z.string().min(1),
});
//# sourceMappingURL=verification.validator.js.map
import { z } from "zod";
export declare const telegramAuthSchema: z.ZodObject<{
    initData: z.ZodString;
}, z.core.$strip>;
export type TelegramAuthInput = z.infer<typeof telegramAuthSchema>;
//# sourceMappingURL=auth.validator.d.ts.map
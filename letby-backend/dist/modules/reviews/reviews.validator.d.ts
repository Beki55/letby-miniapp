import { z } from "zod";
export declare const createReviewSchema: z.ZodObject<{
    sellerId: z.ZodString;
    rating: z.ZodNumber;
    comment: z.ZodString;
}, z.core.$strip>;
export type CreateReviewInput = z.infer<typeof createReviewSchema>;
//# sourceMappingURL=reviews.validator.d.ts.map
import { z } from "zod";
export const createReviewSchema = z.object({
    sellerId: z.string().min(1),
    rating: z.number().int().min(1).max(5),
    comment: z.string().min(1).max(1000),
});
//# sourceMappingURL=reviews.validator.js.map
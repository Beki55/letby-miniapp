import { z } from "zod";

export const verifySellerSchema = z.object({
  approved: z.boolean(),
});

export type VerifySellerInput = z.infer<typeof verifySellerSchema>;

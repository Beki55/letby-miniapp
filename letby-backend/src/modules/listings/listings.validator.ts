import { z } from "zod";

export const createListingSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  price: z.number().positive(),
  category: z.string().min(1),
  stock: z.number().int().nonnegative().default(1),
  minPrice: z.number().positive().optional(),
  images: z.array(z.string().url()).max(5).default([]),
});

export const updateListingSchema = createListingSchema.partial();

export const listListingsQuerySchema = z.object({
  q: z.string().optional(),
  category: z.string().optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(50).default(20),
});

export type CreateListingInput = z.infer<typeof createListingSchema>;
export type UpdateListingInput = z.infer<typeof updateListingSchema>;
export type ListListingsQuery = z.infer<typeof listListingsQuerySchema>;

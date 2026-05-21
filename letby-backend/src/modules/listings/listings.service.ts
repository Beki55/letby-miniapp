import type {
  CreateListingInput,
  ListListingsQuery,
  UpdateListingInput,
} from "./listings.validator.js";

export interface ListingRecord {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  minPrice?: number;
  images: string[];
  sellerId: string;
  trustScore: number;
  createdAt: string;
}

const listingsStore = new Map<string, ListingRecord>();

export const searchListings = async (
  query: ListListingsQuery
): Promise<{ items: ListingRecord[]; page: number; limit: number; total: number }> => {
  let items = [...listingsStore.values()];

  if (query.q) {
    const term = query.q.toLowerCase();
    items = items.filter(
      (item) =>
        item.title.toLowerCase().includes(term) ||
        item.description.toLowerCase().includes(term)
    );
  }

  if (query.category) {
    items = items.filter((item) => item.category === query.category);
  }

  const total = items.length;
  const start = (query.page - 1) * query.limit;
  const paged = items.slice(start, start + query.limit);

  return { items: paged, page: query.page, limit: query.limit, total };
};

export const getListingById = async (id: string): Promise<ListingRecord | null> => {
  return listingsStore.get(id) ?? null;
};

export const createListing = async (
  sellerId: string,
  input: CreateListingInput
): Promise<ListingRecord> => {
  const id = crypto.randomUUID();
  const record: ListingRecord = {
    id,
    sellerId,
    title: input.title,
    description: input.description,
    price: input.price,
    category: input.category,
    stock: input.stock,
    images: input.images,
    trustScore: 50,
    createdAt: new Date().toISOString(),
  };

  if (input.minPrice !== undefined) {
    record.minPrice = input.minPrice;
  }

  listingsStore.set(id, record);
  return record;
};

export const updateListing = async (
  id: string,
  sellerId: string,
  input: UpdateListingInput
): Promise<ListingRecord | null> => {
  const existing = listingsStore.get(id);
  if (!existing || existing.sellerId !== sellerId) {
    return null;
  }

  const updated: ListingRecord = {
    ...existing,
    title: input.title ?? existing.title,
    description: input.description ?? existing.description,
    price: input.price ?? existing.price,
    category: input.category ?? existing.category,
    stock: input.stock ?? existing.stock,
    images: input.images ?? existing.images,
    minPrice: input.minPrice ?? existing.minPrice,
  };

  listingsStore.set(id, updated);
  return updated;
};

export const deleteListing = async (
  id: string,
  sellerId: string
): Promise<boolean> => {
  const existing = listingsStore.get(id);
  if (!existing || existing.sellerId !== sellerId) {
    return false;
  }

  return listingsStore.delete(id);
};

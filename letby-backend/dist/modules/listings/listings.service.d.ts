import type { CreateListingInput, ListListingsQuery, UpdateListingInput } from "./listings.validator.js";
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
export declare const searchListings: (query: ListListingsQuery) => Promise<{
    items: ListingRecord[];
    page: number;
    limit: number;
    total: number;
}>;
export declare const getListingById: (id: string) => Promise<ListingRecord | null>;
export declare const createListing: (sellerId: string, input: CreateListingInput) => Promise<ListingRecord>;
export declare const updateListing: (id: string, sellerId: string, input: UpdateListingInput) => Promise<ListingRecord | null>;
export declare const deleteListing: (id: string, sellerId: string) => Promise<boolean>;
//# sourceMappingURL=listings.service.d.ts.map
export interface ReviewRecord {
    id: string;
    sellerId: string;
    buyerId: string;
    rating: number;
    comment: string;
    createdAt: string;
}
export declare const createReview: (buyerId: string, sellerId: string, rating: number, comment: string) => Promise<ReviewRecord>;
export declare const getReviewsForSeller: (sellerId: string) => Promise<ReviewRecord[]>;
//# sourceMappingURL=reviews.service.d.ts.map
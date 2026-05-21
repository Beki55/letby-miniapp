export interface ReviewRecord {
  id: string;
  sellerId: string;
  buyerId: string;
  rating: number;
  comment: string;
  createdAt: string;
}

const reviewsStore = new Map<string, ReviewRecord[]>();

export const createReview = async (
  buyerId: string,
  sellerId: string,
  rating: number,
  comment: string
): Promise<ReviewRecord> => {
  const review: ReviewRecord = {
    id: crypto.randomUUID(),
    sellerId,
    buyerId,
    rating,
    comment,
    createdAt: new Date().toISOString(),
  };

  const existing = reviewsStore.get(sellerId) ?? [];
  existing.push(review);
  reviewsStore.set(sellerId, existing);
  return review;
};

export const getReviewsForSeller = async (
  sellerId: string
): Promise<ReviewRecord[]> => {
  return reviewsStore.get(sellerId) ?? [];
};

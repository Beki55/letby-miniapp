const reviewsStore = new Map();
export const createReview = async (buyerId, sellerId, rating, comment) => {
    const review = {
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
export const getReviewsForSeller = async (sellerId) => {
    return reviewsStore.get(sellerId) ?? [];
};
//# sourceMappingURL=reviews.service.js.map
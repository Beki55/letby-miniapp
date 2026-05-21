const listingsStore = new Map();
export const searchListings = async (query) => {
    let items = [...listingsStore.values()];
    if (query.q) {
        const term = query.q.toLowerCase();
        items = items.filter((item) => item.title.toLowerCase().includes(term) ||
            item.description.toLowerCase().includes(term));
    }
    if (query.category) {
        items = items.filter((item) => item.category === query.category);
    }
    const total = items.length;
    const start = (query.page - 1) * query.limit;
    const paged = items.slice(start, start + query.limit);
    return { items: paged, page: query.page, limit: query.limit, total };
};
export const getListingById = async (id) => {
    return listingsStore.get(id) ?? null;
};
export const createListing = async (sellerId, input) => {
    const id = crypto.randomUUID();
    const record = {
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
export const updateListing = async (id, sellerId, input) => {
    const existing = listingsStore.get(id);
    if (!existing || existing.sellerId !== sellerId) {
        return null;
    }
    const updated = {
        ...existing,
        ...input,
        images: input.images ?? existing.images,
    };
    listingsStore.set(id, updated);
    return updated;
};
export const deleteListing = async (id, sellerId) => {
    const existing = listingsStore.get(id);
    if (!existing || existing.sellerId !== sellerId) {
        return false;
    }
    return listingsStore.delete(id);
};
//# sourceMappingURL=listings.service.js.map
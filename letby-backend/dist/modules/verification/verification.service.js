const submissions = new Map();
export const submitVerification = async (userId, data) => {
    const record = {
        userId,
        ...data,
        status: "PENDING",
        submittedAt: new Date().toISOString(),
    };
    submissions.set(userId, record);
    return record;
};
export const getVerificationStatus = async (userId) => {
    return submissions.get(userId)?.status ?? "NONE";
};
export const listPendingVerifications = async () => {
    return [...submissions.values()].filter((item) => item.status === "PENDING");
};
export const setVerificationStatus = async (userId, status) => {
    const existing = submissions.get(userId);
    if (!existing) {
        return null;
    }
    const updated = { ...existing, status };
    submissions.set(userId, updated);
    return updated;
};
//# sourceMappingURL=verification.service.js.map
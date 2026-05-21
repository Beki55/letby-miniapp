const reportsStore = [];
export const createReport = async (reporterId, targetType, targetId, reason) => {
    const report = {
        id: crypto.randomUUID(),
        reporterId,
        targetType,
        targetId,
        reason,
        createdAt: new Date().toISOString(),
    };
    reportsStore.push(report);
    return report;
};
//# sourceMappingURL=reports.service.js.map
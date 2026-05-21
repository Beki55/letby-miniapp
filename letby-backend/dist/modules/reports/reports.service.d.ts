export interface ReportRecord {
    id: string;
    reporterId: string;
    targetType: "listing" | "user";
    targetId: string;
    reason: string;
    createdAt: string;
}
export declare const createReport: (reporterId: string, targetType: ReportRecord["targetType"], targetId: string, reason: string) => Promise<ReportRecord>;
//# sourceMappingURL=reports.service.d.ts.map
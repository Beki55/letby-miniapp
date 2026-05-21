export interface ReportRecord {
  id: string;
  reporterId: string;
  targetType: "listing" | "user";
  targetId: string;
  reason: string;
  createdAt: string;
}

const reportsStore: ReportRecord[] = [];

export const createReport = async (
  reporterId: string,
  targetType: ReportRecord["targetType"],
  targetId: string,
  reason: string
): Promise<ReportRecord> => {
  const report: ReportRecord = {
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

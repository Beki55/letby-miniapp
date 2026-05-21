export type VerificationStatus = "NONE" | "PENDING" | "APPROVED" | "REJECTED";

export interface VerificationSubmission {
  userId: string;
  nationalIdUrl: string;
  selfieUrl: string;
  phone: string;
  telegramUsername: string;
  status: VerificationStatus;
  submittedAt: string;
}

const submissions = new Map<string, VerificationSubmission>();

export const submitVerification = async (
  userId: string,
  data: Omit<VerificationSubmission, "userId" | "status" | "submittedAt">
): Promise<VerificationSubmission> => {
  const record: VerificationSubmission = {
    userId,
    ...data,
    status: "PENDING",
    submittedAt: new Date().toISOString(),
  };

  submissions.set(userId, record);
  return record;
};

export const getVerificationStatus = async (
  userId: string
): Promise<VerificationStatus> => {
  return submissions.get(userId)?.status ?? "NONE";
};

export const listPendingVerifications = async (): Promise<VerificationSubmission[]> => {
  return [...submissions.values()].filter((item) => item.status === "PENDING");
};

export const setVerificationStatus = async (
  userId: string,
  status: "APPROVED" | "REJECTED"
): Promise<VerificationSubmission | null> => {
  const existing = submissions.get(userId);
  if (!existing) {
    return null;
  }

  const updated = { ...existing, status };
  submissions.set(userId, updated);
  return updated;
};

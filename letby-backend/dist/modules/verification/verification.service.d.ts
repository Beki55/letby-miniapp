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
export declare const submitVerification: (userId: string, data: Omit<VerificationSubmission, "userId" | "status" | "submittedAt">) => Promise<VerificationSubmission>;
export declare const getVerificationStatus: (userId: string) => Promise<VerificationStatus>;
export declare const listPendingVerifications: () => Promise<VerificationSubmission[]>;
export declare const setVerificationStatus: (userId: string, status: "APPROVED" | "REJECTED") => Promise<VerificationSubmission | null>;
//# sourceMappingURL=verification.service.d.ts.map
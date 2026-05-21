import * as verificationService from "../verification/verification.service.js";
export declare const getVerificationQueue: () => Promise<verificationService.VerificationSubmission[]>;
export declare const verifySeller: (userId: string, approved: boolean) => Promise<verificationService.VerificationSubmission | null>;
//# sourceMappingURL=admin.service.d.ts.map
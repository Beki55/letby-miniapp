import * as verificationService from "../verification/verification.service.js";

export const getVerificationQueue = async () => {
  return verificationService.listPendingVerifications();
};

export const verifySeller = async (
  userId: string,
  approved: boolean
) => {
  return verificationService.setVerificationStatus(
    userId,
    approved ? "APPROVED" : "REJECTED"
  );
};

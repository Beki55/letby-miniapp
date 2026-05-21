import type { PublicUser } from "../../types/auth.js";
export declare const getSellerProfile: (userId: string) => Promise<{
    user: PublicUser;
    trustScore: number;
} | null>;
//# sourceMappingURL=users.service.d.ts.map
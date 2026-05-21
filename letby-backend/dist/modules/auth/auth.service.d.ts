import type { AuthSession, PublicUser } from "../../types/auth.js";
export declare const authenticateWithTelegram: (initData: string) => Promise<{
    token: string;
    user: PublicUser;
}>;
export declare const getSession: (userId: string) => Promise<AuthSession | null>;
export declare const revokeSession: (userId: string) => Promise<void>;
export declare const getUserById: (userId: string) => Promise<PublicUser | null>;
//# sourceMappingURL=auth.service.d.ts.map
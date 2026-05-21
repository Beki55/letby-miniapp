import type { JwtUserPayload } from "../types/auth.js";
export declare const signToken: (payload: JwtUserPayload) => string;
export declare const verifyToken: (token: string) => JwtUserPayload;
export declare const getJwtExpiresInSeconds: () => number;
//# sourceMappingURL=jwt.d.ts.map
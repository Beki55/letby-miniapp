import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
const JWT_EXPIRES_IN = "7d";
const JWT_EXPIRES_SECONDS = 7 * 24 * 60 * 60;
export const signToken = (payload) => {
    return jwt.sign(payload, env.JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN,
    });
};
export const verifyToken = (token) => {
    const decoded = jwt.verify(token, env.JWT_SECRET);
    if (typeof decoded === "string" || !decoded || typeof decoded !== "object") {
        throw new Error("Invalid token payload");
    }
    const { userId, telegramId, role } = decoded;
    if (!userId || !telegramId || !role) {
        throw new Error("Invalid token payload");
    }
    return { userId, telegramId, role };
};
export const getJwtExpiresInSeconds = () => JWT_EXPIRES_SECONDS;
//# sourceMappingURL=jwt.js.map
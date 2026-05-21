import crypto from "node:crypto";
const AUTH_MAX_AGE_SECONDS = 86_400; // 24 hours
export const verifyTelegramInitData = (initData, botToken) => {
    try {
        const params = new URLSearchParams(initData);
        const hash = params.get("hash");
        if (!hash) {
            return null;
        }
        const authDateRaw = params.get("auth_date");
        if (!authDateRaw) {
            return null;
        }
        const authDate = Number.parseInt(authDateRaw, 10);
        if (Number.isNaN(authDate)) {
            return null;
        }
        const now = Math.floor(Date.now() / 1000);
        if (now - authDate > AUTH_MAX_AGE_SECONDS) {
            return null;
        }
        params.delete("hash");
        const dataCheckString = [...params.entries()]
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([key, value]) => `${key}=${value}`)
            .join("\n");
        const secretKey = crypto
            .createHmac("sha256", botToken)
            .update("WebAppData")
            .digest();
        const calculatedHash = crypto
            .createHmac("sha256", secretKey)
            .update(dataCheckString)
            .digest("hex");
        if (calculatedHash !== hash) {
            return null;
        }
        const userRaw = params.get("user");
        if (!userRaw) {
            return null;
        }
        const user = JSON.parse(userRaw);
        if (!user?.id) {
            return null;
        }
        const result = { user, authDate };
        const queryId = params.get("query_id");
        if (queryId) {
            result.queryId = queryId;
        }
        return result;
    }
    catch {
        return null;
    }
};
//# sourceMappingURL=telegram.verify.js.map
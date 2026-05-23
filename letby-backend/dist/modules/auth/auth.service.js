import { env } from "../../config/env.js";
import { redis } from "../../config/redis.js";
import { prisma } from "../../prisma/client.js";
import { UnauthorizedError } from "../../utils/errors.js";
import { getJwtExpiresInSeconds, signToken } from "../../utils/jwt.js";
import { verifyTelegramInitData } from "../../utils/telegram.verify.js";
const sessionKey = (userId) => `session:${userId}`;
const toPublicUser = (user) => ({
    id: user.id,
    telegramId: user.telegramId.toString(),
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
    photoUrl: user.photoUrl,
    role: user.role,
    createdAt: user.createdAt.toISOString(),
});
export const authenticateWithTelegram = async (initData) => {
    const verified = verifyTelegramInitData(initData, env.TELEGRAM_BOT_TOKEN);
    if (!verified) {
        throw new UnauthorizedError("Invalid or expired Telegram initData");
    }
    const { user: telegramUser } = verified;
    const telegramId = BigInt(telegramUser.id);
    const existingUser = await prisma.user.findUnique({
        where: { telegramId },
    });
    if (!existingUser || !existingUser.phoneNumber) {
        throw new UnauthorizedError("You must share your contact in the bot before accessing the miniapp.");
    }
    const user = await prisma.user.update({
        where: { telegramId },
        data: {
            firstName: telegramUser.first_name,
            lastName: telegramUser.last_name ?? null,
            username: telegramUser.username ?? null,
            photoUrl: telegramUser.photo_url ?? null,
        },
    });
    const payload = {
        userId: user.id,
        telegramId: user.telegramId.toString(),
        role: user.role,
    };
    const token = signToken(payload);
    const session = {
        userId: user.id,
        telegramId: payload.telegramId,
        role: user.role,
    };
    await redis.set(sessionKey(user.id), JSON.stringify(session), "EX", getJwtExpiresInSeconds());
    return {
        token,
        user: toPublicUser(user),
    };
};
export const getSession = async (userId) => {
    const raw = await redis.get(sessionKey(userId));
    if (!raw) {
        return null;
    }
    return JSON.parse(raw);
};
export const revokeSession = async (userId) => {
    await redis.del(sessionKey(userId));
};
export const getUserById = async (userId) => {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    return user ? toPublicUser(user) : null;
};
//# sourceMappingURL=auth.service.js.map
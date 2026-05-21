import { env } from "../../config/env.js";
import { redis } from "../../config/redis.js";
import { prisma } from "../../prisma/client.js";
import type { AuthSession, JwtUserPayload, PublicUser } from "../../types/auth.js";
import { UnauthorizedError } from "../../utils/errors.js";
import { getJwtExpiresInSeconds, signToken } from "../../utils/jwt.js";
import { verifyTelegramInitData } from "../../utils/telegram.verify.js";
import type { User } from "../../generated/prisma/client.js";

const sessionKey = (userId: string) => `session:${userId}`;

const toPublicUser = (user: User): PublicUser => ({
  id: user.id,
  telegramId: user.telegramId.toString(),
  firstName: user.firstName,
  lastName: user.lastName,
  username: user.username,
  photoUrl: user.photoUrl,
  role: user.role,
  createdAt: user.createdAt.toISOString(),
});

export const authenticateWithTelegram = async (
  initData: string
): Promise<{ token: string; user: PublicUser }> => {
  const verified = verifyTelegramInitData(initData, env.TELEGRAM_BOT_TOKEN);

  if (!verified) {
    throw new UnauthorizedError("Invalid or expired Telegram initData");
  }

  const { user: telegramUser } = verified;
  const telegramId = BigInt(telegramUser.id);

  const user = await prisma.user.upsert({
    where: { telegramId },
    create: {
      telegramId,
      firstName: telegramUser.first_name,
      lastName: telegramUser.last_name ?? null,
      username: telegramUser.username ?? null,
      photoUrl: telegramUser.photo_url ?? null,
    },
    update: {
      firstName: telegramUser.first_name,
      lastName: telegramUser.last_name ?? null,
      username: telegramUser.username ?? null,
      photoUrl: telegramUser.photo_url ?? null,
    },
  });

  const payload: JwtUserPayload = {
    userId: user.id,
    telegramId: user.telegramId.toString(),
    role: user.role,
  };

  const token = signToken(payload);

  const session: AuthSession = {
    userId: user.id,
    telegramId: payload.telegramId,
    role: user.role,
  };

  await redis.set(
    sessionKey(user.id),
    JSON.stringify(session),
    "EX",
    getJwtExpiresInSeconds()
  );

  return {
    token,
    user: toPublicUser(user),
  };
};

export const getSession = async (
  userId: string
): Promise<AuthSession | null> => {
  const raw = await redis.get(sessionKey(userId));
  if (!raw) {
    return null;
  }

  return JSON.parse(raw) as AuthSession;
};

export const revokeSession = async (userId: string): Promise<void> => {
  await redis.del(sessionKey(userId));
};

export const getUserById = async (userId: string): Promise<PublicUser | null> => {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  return user ? toPublicUser(user) : null;
};

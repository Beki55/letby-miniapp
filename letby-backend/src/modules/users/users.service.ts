import { prisma } from "../../prisma/client.js";
import { calculateTrustScore } from "../../utils/trust.score.js";
import type { PublicUser } from "../../types/auth.js";
import type { User } from "../../generated/prisma/client.js";

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

export const getSellerProfile = async (userId: string) => {
  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (!user) {
    return null;
  }

  return {
    user: toPublicUser(user),
    trustScore: calculateTrustScore(userId),
  };
};

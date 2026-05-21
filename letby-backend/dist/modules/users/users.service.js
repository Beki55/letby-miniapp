import { prisma } from "../../prisma/client.js";
import { calculateTrustScore } from "../../utils/trust.score.js";
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
export const getSellerProfile = async (userId) => {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
        return null;
    }
    return {
        user: toPublicUser(user),
        trustScore: calculateTrustScore(userId),
    };
};
//# sourceMappingURL=users.service.js.map
import { redis } from "../../config/redis.js";
const sessionKey = (telegramUserId) => `bot:negotiation:${telegramUserId}`;
export const registerNegotiationHandler = (bot) => {
    bot.command("negotiate", async (ctx) => {
        const listingId = ctx.message.text.split(" ")[1]?.trim();
        if (!listingId) {
            await ctx.reply("Usage: /negotiate <listingId>");
            return;
        }
        const userId = ctx.from?.id;
        if (!userId) {
            return;
        }
        await redis.set(sessionKey(userId), JSON.stringify({ listingId, step: "awaiting_offer" }), "EX", 60 * 60);
        await ctx.reply(`Negotiation started for listing ${listingId}. Send your offer amount in ETB.`);
    });
    bot.on("text", async (ctx, next) => {
        const userId = ctx.from?.id;
        if (!userId) {
            return next();
        }
        const raw = await redis.get(sessionKey(userId));
        if (!raw) {
            return next();
        }
        const session = JSON.parse(raw);
        if (session.step !== "awaiting_offer") {
            return next();
        }
        const offer = Number.parseFloat(ctx.message.text);
        if (Number.isNaN(offer)) {
            await ctx.reply("Please send a numeric offer in ETB.");
            return;
        }
        await redis.set(sessionKey(userId), JSON.stringify({ ...session, step: "offer_sent", offer }), "EX", 60 * 60);
        await ctx.reply(`Offer ${offer} ETB recorded for listing ${session.listingId}. Seller will be notified.`);
    });
};
//# sourceMappingURL=negotiation.handler.js.map
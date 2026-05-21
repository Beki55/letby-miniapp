import { env } from "../../config/env.js";
const apiBase = () => env.API_BASE_URL ?? `http://127.0.0.1:${env.PORT}`;
export const registerListingHandler = (bot) => {
    bot.command("listing", async (ctx) => {
        const id = ctx.message.text.split(" ")[1]?.trim();
        if (!id) {
            await ctx.reply("Usage: /listing <id>");
            return;
        }
        try {
            const response = await fetch(`${apiBase()}/api/listings/${id}`);
            if (!response.ok) {
                await ctx.reply("Listing not found.");
                return;
            }
            const data = (await response.json());
            const { listing } = data;
            await ctx.reply(`${listing.title}\n${listing.description}\nPrice: ${listing.price} ETB\nTrust: ${listing.trustScore}`);
        }
        catch {
            await ctx.reply("Could not load listing.");
        }
    });
};
//# sourceMappingURL=listing.handler.js.map
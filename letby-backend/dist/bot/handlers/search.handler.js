import { env } from "../../config/env.js";
const apiBase = () => env.API_BASE_URL ?? `http://127.0.0.1:${env.PORT}`;
export const registerSearchHandler = (bot) => {
    bot.hears(/search\s+(.+)/i, async (ctx) => {
        const query = ctx.match[1]?.trim();
        if (!query) {
            await ctx.reply("Usage: search <keyword>");
            return;
        }
        try {
            const url = new URL("/api/listings", apiBase());
            url.searchParams.set("q", query);
            const response = await fetch(url);
            const data = (await response.json());
            if (!data.items?.length) {
                await ctx.reply(`No listings found for "${query}".`);
                return;
            }
            const lines = data.items
                .slice(0, 5)
                .map((item, index) => `${index + 1}. ${item.title} — ${item.price} ETB (trust ${item.trustScore})`)
                .join("\n");
            await ctx.reply(`Results for "${query}":\n\n${lines}`);
        }
        catch {
            await ctx.reply("Search failed. Try again later.");
        }
    });
};
//# sourceMappingURL=search.handler.js.map
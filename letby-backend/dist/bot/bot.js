import { Telegraf } from "telegraf";
import { env } from "../config/env.js";
import { registerListingHandler } from "./handlers/listing.handler.js";
import { registerNegotiationHandler } from "./handlers/negotiation.handler.js";
import { registerReviewHandler } from "./handlers/review.handler.js";
import { registerSearchHandler } from "./handlers/search.handler.js";
import { mainMenuKeyboard } from "./keyboards/index.js";
export const createBot = () => {
    const bot = new Telegraf(env.TELEGRAM_BOT_TOKEN);
    bot.start(async (ctx) => {
        await ctx.reply("Welcome to LetBy.\n\nCommands:\n• search <keyword>\n• /listing <id>\n• /negotiate <listingId>", mainMenuKeyboard());
    });
    registerSearchHandler(bot);
    registerListingHandler(bot);
    registerNegotiationHandler(bot);
    registerReviewHandler(bot);
    return bot;
};
export const startBot = async () => {
    const bot = createBot();
    await bot.launch();
    console.log("Telegram bot started");
    const stop = (signal) => {
        bot.stop(signal);
    };
    process.once("SIGINT", () => stop("SIGINT"));
    process.once("SIGTERM", () => stop("SIGTERM"));
    return bot;
};
//# sourceMappingURL=bot.js.map
import { Telegraf, Markup } from "telegraf";
import { env } from "../config/env.js";
import { prisma } from "../prisma/client.js";
import { registerListingHandler } from "./handlers/listing.handler.js";
import { registerNegotiationHandler } from "./handlers/negotiation.handler.js";
import { registerReviewHandler } from "./handlers/review.handler.js";
import { registerSearchHandler } from "./handlers/search.handler.js";
import { mainMenuKeyboard } from "./keyboards/index.js";
/**
 * Upserts a Telegram user record in the database whenever they interact
 * with /start.  This ensures the user row exists before the Mini-App
 * sends `initData` to POST /api/auth/telegram.
 */
const upsertTelegramUser = async (from, phoneNumber) => {
    const telegramId = BigInt(from.id);
    await prisma.user.upsert({
        where: { telegramId },
        create: {
            telegramId,
            firstName: from.first_name,
            lastName: from.last_name ?? null,
            username: from.username ?? null,
            phoneNumber: phoneNumber ?? null,
        },
        update: {
            firstName: from.first_name,
            lastName: from.last_name ?? null,
            username: from.username ?? null,
            ...(phoneNumber ? { phoneNumber } : {}),
        },
    });
};
export const createBot = () => {
    const bot = new Telegraf(env.TELEGRAM_BOT_TOKEN);
    /* ───── /start ───── */
    const showWelcome = async (ctx) => {
        const welcomeText = [
            `👋 Welcome to *LetBy* — your trusted Ethiopian marketplace!`,
            ``,
            `Buy and sell safely with verified sellers and AI-powered negotiation.`,
            ``,
            `*Commands:*`,
            `• \`search <keyword>\` — find listings`,
            `• /listing <id> — view a listing`,
            `• /negotiate <listingId> — start a negotiation`,
            `• /review — about reviews`,
        ].join("\n");
        const inlineButtons = [];
        if (env.WEB_APP_URL) {
            inlineButtons.push([
                Markup.button.webApp("🛍 Open Letby", env.WEB_APP_URL),
            ]);
        }
        await ctx.reply(welcomeText, {
            parse_mode: "Markdown",
            ...Markup.inlineKeyboard(inlineButtons),
        });
        if (env.WEB_APP_URL) {
            await ctx.reply("Use the buttons below for quick access:", mainMenuKeyboard());
        }
    };
    /* ───── /start ───── */
    bot.start(async (ctx) => {
        if (!ctx.from)
            return;
        try {
            const existingUser = await prisma.user.findUnique({
                where: { telegramId: BigInt(ctx.from.id) },
            });
            if (!existingUser || !existingUser.phoneNumber) {
                await ctx.reply("👋 Welcome to *LetBy*!\n\nTo get started and access the miniapp, please share your phone number with us.", {
                    parse_mode: "Markdown",
                    ...Markup.keyboard([
                        Markup.button.contactRequest("📱 Share Contact")
                    ]).oneTime().resize()
                });
                return;
            }
            await showWelcome(ctx);
        }
        catch (err) {
            console.error("Error on /start:", err);
            await ctx.reply("An error occurred. Please try again.");
        }
    });
    /* ───── contact share ───── */
    bot.on("contact", async (ctx) => {
        const contact = ctx.message.contact;
        if (contact.user_id !== ctx.from.id) {
            await ctx.reply("Please share your own contact using the button provided.");
            return;
        }
        try {
            await upsertTelegramUser(ctx.from, contact.phone_number);
            await ctx.reply("✅ Registration successful!", Markup.removeKeyboard());
            await showWelcome(ctx);
        }
        catch (err) {
            console.error("Failed to register on contact share:", err);
            await ctx.reply("❌ Registration failed. Please try again.");
        }
    });
    /* ───── /open — shortcut to the mini-app ───── */
    bot.command("open", async (ctx) => {
        if (!env.WEB_APP_URL) {
            await ctx.reply("The mini-app is not configured yet.");
            return;
        }
        await ctx.reply("Tap the button below to open Letby:", {
            ...Markup.inlineKeyboard([
                [Markup.button.webApp("🛍 Open Letby", env.WEB_APP_URL)],
            ]),
        });
    });
    /* ───── /help ───── */
    bot.command("help", async (ctx) => {
        await ctx.reply([
            "*LetBy Bot Commands*",
            "",
            "• `search <keyword>` — find listings",
            "• /listing <id> — view a listing",
            "• /negotiate <listingId> — start a negotiation",
            "• /review — about reviews",
            "• /open — open the mini-app",
            "• /help — show this message",
        ].join("\n"), { parse_mode: "Markdown" });
    });
    registerSearchHandler(bot);
    registerListingHandler(bot);
    registerNegotiationHandler(bot);
    registerReviewHandler(bot);
    return bot;
};
export const startBot = async () => {
    const bot = createBot();
    // Set bot commands for the menu button
    await bot.telegram.setMyCommands([
        { command: "start", description: "Start the bot" },
        { command: "open", description: "Open the Letby mini-app" },
        { command: "help", description: "Show available commands" },
        { command: "listing", description: "View a listing by ID" },
        { command: "negotiate", description: "Negotiate on a listing" },
        { command: "review", description: "About reviews" },
    ]);
    // Set the Menu button to open the Mini App (appears as☰ → "Open App")
    if (env.WEB_APP_URL) {
        await bot.telegram.setChatMenuButton({
            menuButton: {
                type: "web_app",
                text: "Open Letby",
                web_app: { url: env.WEB_APP_URL },
            },
        });
    }
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
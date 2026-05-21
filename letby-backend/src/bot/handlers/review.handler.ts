import type { Telegraf } from "telegraf";
import type { Context } from "telegraf";

export const registerReviewHandler = (bot: Telegraf<Context>): void => {
  bot.command("review", async (ctx) => {
    await ctx.reply(
      "Reviews are submitted in the Mini App after a verified purchase."
    );
  });
};

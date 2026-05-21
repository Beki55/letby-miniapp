import "dotenv/config";

import app from "./app.js";
import { startBot } from "./bot/bot.js";
import { env } from "./config/env.js";

const PORT = env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

if (env.ENABLE_TELEGRAM_BOT) {
  startBot().catch((err) => {
    console.error("Failed to start Telegram bot:", err);
  });
}

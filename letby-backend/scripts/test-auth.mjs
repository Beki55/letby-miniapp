import crypto from "node:crypto";
import jwt from "jsonwebtoken";

const botToken = process.env.TELEGRAM_BOT_TOKEN ?? "test-bot-token";
const jwtSecret = process.env.JWT_SECRET ?? "letby-dev-jwt-secret-change-in-production-32chars";

const user = {
  id: 123456789,
  first_name: "Test",
  last_name: "User",
  username: "testuser",
};

const authDate = Math.floor(Date.now() / 1000);
const params = new URLSearchParams({
  auth_date: String(authDate),
  user: JSON.stringify(user),
});

const dataCheckString = [...params.entries()]
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([key, value]) => `${key}=${value}`)
  .join("\n");

const secretKey = crypto.createHmac("sha256", botToken).update("WebAppData").digest();
const hash = crypto.createHmac("sha256", secretKey).update(dataCheckString).digest("hex");

params.set("hash", hash);
const initData = params.toString();

const { verifyTelegramInitData } = await import("../dist/utils/telegram.verify.js");
const verified = verifyTelegramInitData(initData, botToken);

if (!verified || verified.user.id !== user.id) {
  console.error("Telegram verify FAILED");
  process.exit(1);
}

const payload = { userId: "user-1", telegramId: String(user.id), role: "BUYER" };
const token = jwt.sign(payload, jwtSecret, { expiresIn: "7d" });
const decoded = jwt.verify(token, jwtSecret);

if (decoded.userId !== payload.userId) {
  console.error("JWT round-trip FAILED");
  process.exit(1);
}

console.log("Telegram HMAC verify: OK");
console.log("JWT sign/verify: OK");

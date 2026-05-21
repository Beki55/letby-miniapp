import { config } from "dotenv";
import { z } from "zod";
// Must run before parsing — ESM hoists imports, so server.ts dotenv runs too late.
config();
const envSchema = z.object({
    NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
    PORT: z.coerce.number().default(5000),
    DATABASE_URL: z.string().min(1),
    JWT_SECRET: z.string().min(8),
    TELEGRAM_BOT_TOKEN: z.string().min(1),
    REDIS_URL: z.string().min(1),
    CLOUDINARY_CLOUD_NAME: z.string().optional(),
    CLOUDINARY_API_KEY: z.string().optional(),
    CLOUDINARY_API_SECRET: z.string().optional(),
    API_BASE_URL: z.string().url().optional(),
    ENABLE_TELEGRAM_BOT: z
        .enum(["true", "false"])
        .default("false")
        .transform((v) => v === "true"),
});
function resolveProcessEnv() {
    const vars = { ...process.env };
    // Support legacy BOT_TOKEN name from .env
    if (!vars.TELEGRAM_BOT_TOKEN && vars.BOT_TOKEN) {
        vars.TELEGRAM_BOT_TOKEN = vars.BOT_TOKEN;
    }
    return vars;
}
function loadEnv() {
    const parsed = envSchema.safeParse(resolveProcessEnv());
    if (!parsed.success) {
        const message = parsed.error.issues
            .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
            .join("; ");
        throw new Error(`Invalid environment variables: ${message}`);
    }
    if (parsed.data.NODE_ENV === "production" &&
        parsed.data.JWT_SECRET.length < 32) {
        throw new Error("JWT_SECRET must be at least 32 characters in production");
    }
    return parsed.data;
}
export const env = loadEnv();
//# sourceMappingURL=env.js.map
/**
 * Telegram WebApp helpers.
 *
 * When the app is opened as a Telegram Mini App, the Telegram JS SDK
 * injects `window.Telegram.WebApp`.  These helpers wait for it, extract
 * initData for backend auth, and provide display-name utilities.
 */

const POLL_INTERVAL_MS = 50;
const DEFAULT_TIMEOUT_MS = 3_000;

const waitForTelegramWebApp = (timeoutMs = DEFAULT_TIMEOUT_MS): Promise<TelegramWebApp | null> => {
  if (typeof window === "undefined") {
    return Promise.resolve(null);
  }

  const existing = window.Telegram?.WebApp;
  if (existing) {
    return Promise.resolve(existing);
  }

  return new Promise((resolve) => {
    const started = Date.now();

    const tick = () => {
      const webApp = window.Telegram?.WebApp;
      if (webApp) {
        resolve(webApp);
        return;
      }
      if (Date.now() - started >= timeoutMs) {
        resolve(null);
        return;
      }
      window.setTimeout(tick, POLL_INTERVAL_MS);
    };

    tick();
  });
};

/**
 * Returns `true` when running inside the Telegram Mini App container
 * and initData is available (i.e. the user opened the app via the bot).
 */
export const isTelegramWebApp = (): boolean => {
  if (typeof window === "undefined") {
    return false;
  }
  return Boolean(window.Telegram?.WebApp?.initData);
};

/**
 * Waits for the Telegram WebApp SDK, calls `ready()` and `expand()`,
 * and returns the raw `initData` string for backend verification.
 *
 * Returns `null` when running outside Telegram or when the SDK times out.
 */
export const getTelegramInitData = async (): Promise<string | null> => {
  const webApp = await waitForTelegramWebApp();
  if (!webApp) {
    return null;
  }

  // Signal to Telegram that the app is ready to be shown
  webApp.ready();
  // Expand the mini-app to full height
  webApp.expand();

  const initData = webApp.initData?.trim();
  return initData || null;
};

/**
 * Returns the Telegram user's display name or `null` if unavailable.
 */
export const getTelegramDisplayName = (): string | null => {
  const user = window.Telegram?.WebApp?.initDataUnsafe?.user;
  if (!user?.first_name) {
    return null;
  }
  return user.last_name ? `${user.first_name} ${user.last_name}` : user.first_name;
};

/**
 * Returns the Telegram user's avatar URL or `null`.
 */
export const getTelegramPhotoUrl = (): string | null => {
  return window.Telegram?.WebApp?.initDataUnsafe?.user?.photo_url ?? null;
};

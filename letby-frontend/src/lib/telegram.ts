const waitForTelegramWebApp = (timeoutMs = 3000): Promise<TelegramWebApp | null> => {
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
      window.setTimeout(tick, 50);
    };

    tick();
  });
};

export const isTelegramWebApp = (): boolean => {
  if (typeof window === "undefined") {
    return false;
  }
  return Boolean(window.Telegram?.WebApp?.initData);
};

export const getTelegramInitData = async (): Promise<string | null> => {
  const webApp = await waitForTelegramWebApp();
  if (!webApp) {
    return null;
  }

  webApp.ready();
  webApp.expand();

  const initData = webApp.initData?.trim();
  return initData ? initData : null;
};

export const getTelegramDisplayName = (): string | null => {
  const user = window.Telegram?.WebApp?.initDataUnsafe?.user;
  if (!user?.first_name) {
    return null;
  }
  return user.last_name ? `${user.first_name} ${user.last_name}` : user.first_name;
};

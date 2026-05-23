import { Markup } from "telegraf";
import { env } from "../../config/env.js";
export const mainMenuKeyboard = () => {
    const rows = [
        ...(env.WEB_APP_URL
            ? [[Markup.button.webApp("Open Letby", env.WEB_APP_URL)]]
            : []),
        ["Search listings", "My negotiations"],
    ];
    return Markup.keyboard(rows).resize();
};
//# sourceMappingURL=index.js.map
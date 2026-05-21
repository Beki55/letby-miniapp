const notificationsStore = new Map();
export const listNotifications = async (userId) => {
    return notificationsStore.get(userId) ?? [];
};
export const pushNotification = async (userId, title, body) => {
    const notification = {
        id: crypto.randomUUID(),
        userId,
        title,
        body,
        read: false,
        createdAt: new Date().toISOString(),
    };
    const existing = notificationsStore.get(userId) ?? [];
    existing.unshift(notification);
    notificationsStore.set(userId, existing);
    return notification;
};
//# sourceMappingURL=notifications.service.js.map
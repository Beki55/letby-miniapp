export interface NotificationRecord {
  id: string;
  userId: string;
  title: string;
  body: string;
  read: boolean;
  createdAt: string;
}

const notificationsStore = new Map<string, NotificationRecord[]>();

export const listNotifications = async (
  userId: string
): Promise<NotificationRecord[]> => {
  return notificationsStore.get(userId) ?? [];
};

export const pushNotification = async (
  userId: string,
  title: string,
  body: string
): Promise<NotificationRecord> => {
  const notification: NotificationRecord = {
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

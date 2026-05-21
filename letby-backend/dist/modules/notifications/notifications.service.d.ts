export interface NotificationRecord {
    id: string;
    userId: string;
    title: string;
    body: string;
    read: boolean;
    createdAt: string;
}
export declare const listNotifications: (userId: string) => Promise<NotificationRecord[]>;
export declare const pushNotification: (userId: string, title: string, body: string) => Promise<NotificationRecord>;
//# sourceMappingURL=notifications.service.d.ts.map
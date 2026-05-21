import type { UserRole } from "../generated/prisma/enums.js";

export interface TelegramWebAppUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  photo_url?: string;
  allows_write_to_pm?: boolean;
}

export interface VerifiedInitData {
  user: TelegramWebAppUser;
  authDate: number;
  queryId?: string;
}

export interface JwtUserPayload {
  userId: string;
  telegramId: string;
  role: UserRole;
}

export interface AuthSession {
  userId: string;
  telegramId: string;
  role: UserRole;
}

export interface PublicUser {
  id: string;
  telegramId: string;
  firstName: string | null;
  lastName: string | null;
  username: string | null;
  photoUrl: string | null;
  role: UserRole;
  createdAt: string;
}

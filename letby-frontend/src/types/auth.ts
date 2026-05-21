export type UserRole = "BUYER" | "SELLER" | "ADMIN";

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

export interface AuthResponse {
  success: boolean;
  token: string;
  user: PublicUser;
}

export interface MeResponse {
  success: boolean;
  user: PublicUser;
}

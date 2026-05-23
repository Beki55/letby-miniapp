import type { AuthResponse, MeResponse } from "@/types/auth";
import { clearStoredToken, getStoredToken } from "./auth-storage";

const API_BASE = import.meta.env.VITE_API_URL?.trim().replace(/\/$/, "") ?? "";

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export const getApiBase = (): string => API_BASE;

export const getApiBaseError = (): string | null => {
  if (API_BASE) {
    return null;
  }

  return "VITE_API_URL is not configured. Set it to your backend URL in the environment.";
};

const requireApiBase = (): string => {
  const apiBase = getApiBase();
  if (!apiBase) {
    throw new ApiError(getApiBaseError() ?? "VITE_API_URL is missing.", 500);
  }

  return apiBase;
};

async function parseJson<T>(res: Response): Promise<T> {
  const body = (await res.json()) as T & { message?: string };
  if (!res.ok) {
    const message =
      typeof body === "object" && body && "message" in body && typeof body.message === "string"
        ? body.message
        : res.statusText;
    throw new ApiError(message, res.status);
  }
  return body;
}

export const loginWithTelegram = async (initData: string): Promise<AuthResponse> => {
  const res = await fetch(`${requireApiBase()}/api/auth/telegram`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ initData }),
  });
  return parseJson<AuthResponse>(res);
};

export const fetchMe = async (token?: string): Promise<MeResponse> => {
  const authToken = token ?? getStoredToken();
  if (!authToken) {
    throw new ApiError("Not authenticated", 401);
  }

  const res = await fetch(`${requireApiBase()}/api/auth/me`, {
    headers: { Authorization: `Bearer ${authToken}` },
  });

  if (res.status === 401) {
    clearStoredToken();
  }

  return parseJson<MeResponse>(res);
};

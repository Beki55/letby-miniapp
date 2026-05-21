import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { ApiError, fetchMe, loginWithTelegram } from "@/lib/api";
import { clearStoredToken, getStoredToken, setStoredToken } from "@/lib/auth-storage";
import { getTelegramInitData, isTelegramWebApp } from "@/lib/telegram";
import type { PublicUser } from "@/types/auth";

export type AuthStatus = "loading" | "authenticated" | "anonymous";

interface AuthContextValue {
  status: AuthStatus;
  user: PublicUser | null;
  token: string | null;
  isTelegram: boolean;
  logout: () => void;
  refresh: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<AuthStatus>("loading");
  const [user, setUser] = useState<PublicUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isTelegram, setIsTelegram] = useState(false);

  const applySession = useCallback((nextToken: string, nextUser: PublicUser) => {
    setStoredToken(nextToken);
    setToken(nextToken);
    setUser(nextUser);
    setStatus("authenticated");
  }, []);

  const clearSession = useCallback(() => {
    clearStoredToken();
    setToken(null);
    setUser(null);
    setStatus("anonymous");
  }, []);

  const authenticate = useCallback(async () => {
    setIsTelegram(isTelegramWebApp());

    const initData = await getTelegramInitData();
    if (initData) {
      const result = await loginWithTelegram(initData);
      applySession(result.token, result.user);
      return;
    }

    const stored = getStoredToken();
    if (!stored) {
      setStatus("anonymous");
      return;
    }

    try {
      const result = await fetchMe(stored);
      applySession(stored, result.user);
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) {
        clearSession();
        return;
      }
      throw error;
    }
  }, [applySession, clearSession]);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        await authenticate();
      } catch (error) {
        console.error("Auth failed:", error);
        if (!cancelled) {
          clearSession();
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [authenticate, clearSession]);

  const logout = useCallback(() => {
    clearSession();
  }, [clearSession]);

  const refresh = useCallback(async () => {
    await authenticate();
  }, [authenticate]);

  const value = useMemo(
    () => ({ status, user, token, isTelegram, logout, refresh }),
    [status, user, token, isTelegram, logout, refresh]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}

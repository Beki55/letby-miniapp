import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ApiError, fetchMe, getApiBaseError, loginWithTelegram } from "@/lib/api";
import { clearStoredToken, getStoredToken, setStoredToken } from "@/lib/auth-storage";
import { getTelegramInitData, isTelegramWebApp } from "@/lib/telegram";
import type { PublicUser } from "@/types/auth";

export type AuthStatus = "loading" | "authenticated" | "anonymous";

type AuthSession = {
  status: Exclude<AuthStatus, "loading">;
  user: PublicUser | null;
  token: string | null;
  isTelegram: boolean;
  error: string | null;
};

const AUTH_QUERY_KEY = ["auth", "session"] as const;

const createAnonymousSession = (isTelegram: boolean): AuthSession => ({
  status: "anonymous",
  user: null,
  token: null,
  isTelegram,
  error: null,
});

const getProductionConfigError = (): string | null => {
  return getApiBaseError();
};

async function resolveAuthSession(): Promise<AuthSession> {
  const isTelegram = isTelegramWebApp();

  const configError = getProductionConfigError();
  if (configError) {
    return {
      ...createAnonymousSession(isTelegram),
      error: configError,
    };
  }

  if (isTelegram) {
    const initData = await getTelegramInitData();
    if (initData) {
      try {
        const result = await loginWithTelegram(initData);
        setStoredToken(result.token);
        return {
          status: "authenticated",
          user: result.user,
          token: result.token,
          isTelegram,
          error: null,
        };
      } catch (err: unknown) {
        console.error("Telegram auto-login failed:", err);
        return {
          ...createAnonymousSession(isTelegram),
          error: err instanceof ApiError ? err.message : "Failed to auto-login. Please try again.",
        };
      }
    }
  }

  const stored = getStoredToken();
  if (!stored) {
    return createAnonymousSession(isTelegram);
  }

  try {
    const result = await fetchMe(stored);
    return {
      status: "authenticated",
      user: result.user,
      token: stored,
      isTelegram,
      error: null,
    };
  } catch (error) {
    if (error instanceof ApiError && error.status === 401) {
      clearStoredToken();
      return createAnonymousSession(isTelegram);
    }
    console.error("Token validation failed:", error);
    return {
      ...createAnonymousSession(isTelegram),
      error: error instanceof ApiError ? error.message : "Unable to reach the backend. Check VITE_API_URL.",
    };
  }
}

interface AuthContextValue {
  status: AuthStatus;
  user: PublicUser | null;
  token: string | null;
  isTelegram: boolean;
  logout: () => void;
  refresh: () => Promise<void>;
  error: string | null;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();
  const [isBootstrapped, setIsBootstrapped] = useState(false);

  // Guard against double-mounting in React 18 StrictMode
  const didRun = useRef(false);

  const sessionQuery = useQuery({
    queryKey: AUTH_QUERY_KEY,
    queryFn: resolveAuthSession,
    enabled: isBootstrapped,
    retry: false,
    staleTime: Infinity,
    gcTime: Infinity,
  });

  useEffect(() => {
    // Prevent double-run in StrictMode
    if (didRun.current) return;
    didRun.current = true;

    setIsBootstrapped(true);
  }, []);

  const session = sessionQuery.data ?? null;

  const logout = async () => {
    clearStoredToken();
    queryClient.setQueryData(AUTH_QUERY_KEY, createAnonymousSession(session?.isTelegram ?? false));
    await queryClient.invalidateQueries({ queryKey: AUTH_QUERY_KEY });
  };

  const refresh = async () => {
    await queryClient.invalidateQueries({ queryKey: AUTH_QUERY_KEY });
    await sessionQuery.refetch();
  };

  const value: AuthContextValue = {
    status:
      !isBootstrapped || sessionQuery.isPending ? "loading" : (session?.status ?? "anonymous"),
    user: session?.user ?? null,
    token: session?.token ?? null,
    isTelegram: session?.isTelegram ?? false,
    logout,
    refresh,
    error: session?.error ?? null,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}

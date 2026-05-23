import type { ReactNode } from "react";
import { BottomNav } from "./BottomNav";
import { useAuth } from "@/contexts/AuthProvider";
import { AlertCircle, LogIn, ShieldCheck, UserCircle2 } from "lucide-react";

export function AppShell({
  children,
  hideNav = false,
}: {
  children: ReactNode;
  hideNav?: boolean;
}) {
  const { error, status, user, isTelegram } = useAuth();
  const displayName =
    user?.firstName ?? user?.username ?? (status === "loading" ? "Loading session" : "Guest");
  const subtitle = user
    ? [user.username ? `@${user.username}` : null, user.role, user.telegramId]
        .filter(Boolean)
        .join(" · ")
    : isTelegram
      ? "Waiting for Telegram login"
      : "Sign in from Telegram to sync your account";

  return (
    <div className="mx-auto min-h-screen max-w-xl pb-28">
      <div className="px-4 pt-4">
        <div className="overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-card via-surface to-card p-4 shadow-elevated">
          <div className="flex items-center gap-3">
            {user?.photoUrl ? (
              <img
                src={user.photoUrl}
                alt=""
                className="h-12 w-12 rounded-2xl object-cover ring-2 ring-primary/40"
              />
            ) : (
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-background/60 text-muted-foreground ring-1 ring-border">
                <UserCircle2 className="h-6 w-6" />
              </div>
            )}
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <p className="truncate text-sm font-semibold text-foreground">{displayName}</p>
                {user && <ShieldCheck className="h-4 w-4 text-success" />}
              </div>
              <p className="truncate text-xs text-muted-foreground">{subtitle}</p>
            </div>
            {status === "loading" ? (
              <span className="rounded-full bg-muted px-2.5 py-1 text-[10px] font-semibold text-muted-foreground">
                Syncing
              </span>
            ) : user ? (
              <span className="rounded-full bg-success/15 px-2.5 py-1 text-[10px] font-semibold text-success">
                Logged in
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 rounded-full bg-primary/15 px-2.5 py-1 text-[10px] font-semibold text-primary">
                <LogIn className="h-3 w-3" /> Guest
              </span>
            )}
          </div>
        </div>
      </div>

      {error && (
        <div className="mx-4 mt-4 flex items-start gap-3 rounded-xl border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <p>{error}</p>
        </div>
      )}
      {children}
      {!hideNav && <BottomNav />}
    </div>
  );
}

import type { ReactNode } from "react";
import { BottomNav } from "./BottomNav";
import { useAuth } from "@/contexts/AuthProvider";
import { AlertCircle } from "lucide-react";

export function AppShell({ children, hideNav = false }: { children: ReactNode; hideNav?: boolean }) {
  const { error } = useAuth();

  return (
    <div className="mx-auto min-h-screen max-w-xl pb-28">
      {error && (
        <div className="mx-4 mt-4 rounded-xl border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive flex items-start gap-3">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <p>{error}</p>
        </div>
      )}
      {children}
      {!hideNav && <BottomNav />}
    </div>
  );
}

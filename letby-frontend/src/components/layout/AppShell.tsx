import type { ReactNode } from "react";
import { BottomNav } from "./BottomNav";

export function AppShell({ children, hideNav = false }: { children: ReactNode; hideNav?: boolean }) {
  return (
    <div className="mx-auto min-h-screen max-w-xl pb-28">
      {children}
      {!hideNav && <BottomNav />}
    </div>
  );
}

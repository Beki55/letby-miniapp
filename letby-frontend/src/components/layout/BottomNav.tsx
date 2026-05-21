import { Link, useLocation } from "@tanstack/react-router";
import { Home, Search, PlusSquare, MessageCircle, User } from "lucide-react";
import { cn } from "@/lib/utils";

type NavItem = {
  to: "/" | "/marketplace" | "/sell" | "/chat" | "/settings";
  label: string;
  icon: typeof Home;
  primary?: boolean;
};

const items: NavItem[] = [
  { to: "/", label: "Home", icon: Home },
  { to: "/marketplace", label: "Browse", icon: Search },
  { to: "/sell", label: "Sell", icon: PlusSquare, primary: true },
  { to: "/chat", label: "Bot", icon: MessageCircle },
  { to: "/settings", label: "You", icon: User },
];

export function BottomNav() {
  const { pathname } = useLocation();
  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 border-t border-border bg-surface/85 backdrop-blur-xl">
      <div className="mx-auto max-w-xl grid grid-cols-5 px-2 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
        {items.map(({ to, label, icon: Icon, primary }) => {
          const active = pathname === to || (to !== "/" && pathname.startsWith(to));
          if (primary) {
            return (
              <Link key={to} to={to} className="flex justify-center">
                <span className="-mt-6 flex h-14 w-14 items-center justify-center rounded-2xl gradient-primary text-primary-foreground shadow-glow">
                  <Icon className="h-6 w-6" />
                </span>
              </Link>
            );
          }
          return (
            <Link
              key={to}
              to={to}
              className={cn(
                "flex flex-col items-center gap-1 py-1.5 text-[11px] font-medium transition-colors",
                active ? "text-primary" : "text-muted-foreground hover:text-foreground",
              )}
            >
              <Icon className={cn("h-5 w-5", active && "scale-110 transition-transform")} />
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

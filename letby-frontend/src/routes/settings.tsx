import { createFileRoute, Link } from "@tanstack/react-router";
import { useAuth } from "@/contexts/AuthProvider";
import { AppShell } from "@/components/layout/AppShell";
import { TrustScore } from "@/components/ui-extras/TrustScore";
import { sellers } from "@/lib/mock";
import {
  Bell, ChevronRight, FileText, HelpCircle, LogOut, Package, Settings as SettingsIcon,
  ShieldCheck, Star, Wallet,
} from "lucide-react";

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title: "Settings — Letby" }] }),
  component: Settings,
});

const sections: { title: string; items: { icon: any; label: string; to?: string; danger?: boolean; badge?: string }[] }[] = [
  {
    title: "Account",
    items: [
      { icon: ShieldCheck, label: "Verification", to: "/verification", badge: "Pending" },
      { icon: Package, label: "My listings" },
      { icon: Star, label: "My reviews" },
      { icon: Wallet, label: "Payouts" },
    ],
  },
  {
    title: "Preferences",
    items: [
      { icon: Bell, label: "Notifications" },
      { icon: SettingsIcon, label: "App settings" },
    ],
  },
  {
    title: "Support",
    items: [
      { icon: HelpCircle, label: "Help center" },
      { icon: FileText, label: "Terms & Privacy" },
      { icon: LogOut, label: "Log out", danger: true },
    ],
  },
];

function Settings() {
  const { user, logout, status } = useAuth();
  const fallback = sellers[0];
  const displayName =
    user?.firstName
      ? [user.firstName, user.lastName].filter(Boolean).join(" ")
      : fallback.name;
  const handle = user?.username ? `@${user.username}` : fallback.username;
  const avatar = user?.photoUrl ?? fallback.avatar;
  const profileId = user?.id ?? fallback.id;

  return (
    <AppShell>
      <header className="px-4 pt-6 pb-4">
        <h1 className="text-2xl font-bold">Settings</h1>
      </header>

      <section className="px-4">
        <div className="rounded-3xl border border-border bg-gradient-to-br from-card via-surface to-card p-5 shadow-elevated">
          <div className="flex items-center gap-4">
            {avatar ? (
              <img src={avatar} alt="" className="h-16 w-16 rounded-2xl object-cover ring-2 ring-primary/40" />
            ) : (
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-surface text-lg font-bold ring-2 ring-primary/40">
                {displayName.charAt(0)}
              </div>
            )}
            <div className="min-w-0 flex-1">
              <p className="text-base font-bold">{status === "loading" ? "Loading…" : displayName}</p>
              <p className="truncate text-xs text-muted-foreground">{handle}</p>
              <div className="mt-1.5"><TrustScore score={fallback.trustScore} verified={fallback.verified} /></div>
            </div>
            <Link to="/profile/$id" params={{ id: profileId }} className="rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-semibold">
              View
            </Link>
          </div>
        </div>
      </section>

      <div className="mt-6 space-y-6 px-4">
        {sections.map((sec) => (
          <div key={sec.title}>
            <p className="mb-2 px-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              {sec.title}
            </p>
            <div className="overflow-hidden rounded-2xl border border-border bg-card">
              {sec.items.map((it, i) => {
                const Icon = it.icon;
                const content = (
                  <div className={`flex items-center gap-3 px-4 py-3.5 ${
                    i !== sec.items.length - 1 ? "border-b border-border" : ""
                  }`}>
                    <Icon className={`h-5 w-5 ${it.danger ? "text-destructive" : "text-muted-foreground"}`} />
                    <span className={`flex-1 text-sm font-medium ${it.danger ? "text-destructive" : ""}`}>
                      {it.label}
                    </span>
                    {it.badge && (
                      <span className="rounded-full bg-warning/20 px-2 py-0.5 text-[10px] font-semibold text-warning">
                        {it.badge}
                      </span>
                    )}
                    {!it.danger && <ChevronRight className="h-4 w-4 text-muted-foreground" />}
                  </div>
                );
                if (it.label === "Log out") {
                  return (
                    <button
                      key={it.label}
                      type="button"
                      onClick={logout}
                      className="block w-full text-left"
                    >
                      {content}
                    </button>
                  );
                }
                return it.to ? (
                  <Link key={it.label} to={it.to}>{content}</Link>
                ) : (
                  <button key={it.label} type="button" className="block w-full text-left">{content}</button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <p className="mt-8 text-center text-[10px] text-muted-foreground">
        Letby v1.0 · Made in Addis Ababa
      </p>
    </AppShell>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthProvider";
import { AppShell } from "@/components/layout/AppShell";
import { CategoryPills } from "@/components/ui-extras/CategoryPills";
import { ProductCard } from "@/components/ui-extras/ProductCard";
import { listings, type Category } from "@/lib/mock";
import { Bell, Search, Sparkles } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Letby — Trusted Ethiopian Marketplace" },
      { name: "description", content: "Buy and sell safely across Addis Ababa with verified sellers and AI-powered negotiation." },
    ],
  }),
  component: Home,
});

function Home() {
  const { status, user } = useAuth();
  const [cat, setCat] = useState<Category>("All");
  const filtered = cat === "All" ? listings : listings.filter((l) => l.category === cat);

  const greetingName =
    user?.firstName ??
    (status === "loading" ? "…" : "there");

  return (
    <AppShell>
      <header className="px-4 pt-6 pb-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground">Selam, {greetingName} 👋</p>
            <h1 className="mt-0.5 text-2xl font-bold tracking-tight">Find your next deal</h1>
          </div>
          <button className="relative flex h-10 w-10 items-center justify-center rounded-full bg-surface border border-border">
            <Bell className="h-5 w-5 text-foreground" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-primary" />
          </button>
        </div>

        <Link
          to="/marketplace"
          className="mt-4 flex items-center gap-3 rounded-2xl border border-border bg-surface px-4 py-3 text-sm text-muted-foreground"
        >
          <Search className="h-4 w-4" />
          Search phones, fashion, cars…
        </Link>

        <div className="mt-4 overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/20 via-surface to-accent/20 p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-background/40 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary">
                <Sparkles className="h-3 w-3" /> AI Buyer Bot
              </div>
              <p className="mt-2 text-sm font-medium leading-snug">
                Let our Telegram bot negotiate the best price for you
              </p>
            </div>
            <Link
              to="/chat"
              className="rounded-xl bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground"
            >
              Try
            </Link>
          </div>
        </div>
      </header>

      <div className="px-4">
        <CategoryPills active={cat} onChange={setCat} />
      </div>

      <section className="mt-4 space-y-3 px-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-foreground">Trending today</h2>
          <Link to="/marketplace" className="text-xs font-medium text-primary">See all</Link>
        </div>
        {filtered.map((l) => (
          <ProductCard key={l.id} listing={l} />
        ))}
      </section>
    </AppShell>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { CategoryPills } from "@/components/ui-extras/CategoryPills";
import { ProductCard } from "@/components/ui-extras/ProductCard";
import { listings, type Category } from "@/lib/mock";
import { Search, SlidersHorizontal, X } from "lucide-react";

export const Route = createFileRoute("/marketplace")({
  head: () => ({
    meta: [
      { title: "Marketplace — Letby" },
      { name: "description", content: "Browse verified listings across Ethiopia. Filter by category, price and trust score." },
    ],
  }),
  component: Marketplace,
});

function Marketplace() {
  const [cat, setCat] = useState<Category>("All");
  const [q, setQ] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [maxPrice, setMaxPrice] = useState<number | "">("");

  const filtered = useMemo(() => {
    return listings.filter((l) => {
      if (cat !== "All" && l.category !== cat) return false;
      if (q && !l.title.toLowerCase().includes(q.toLowerCase())) return false;
      if (verifiedOnly && !l.seller.verified) return false;
      if (maxPrice !== "" && l.price > Number(maxPrice)) return false;
      return true;
    });
  }, [cat, q, verifiedOnly, maxPrice]);

  return (
    <AppShell>
      <header className="sticky top-0 z-20 -mx-0 border-b border-border bg-background/85 px-4 pb-3 pt-6 backdrop-blur-xl">
        <h1 className="text-xl font-bold">Marketplace</h1>
        <div className="mt-3 flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search listings…"
              className="w-full rounded-xl border border-border bg-surface py-2.5 pl-9 pr-3 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none"
            />
          </div>
          <button
            onClick={() => setShowFilters((s) => !s)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface text-foreground"
          >
            <SlidersHorizontal className="h-4 w-4" />
          </button>
        </div>
        <div className="mt-3">
          <CategoryPills active={cat} onChange={setCat} />
        </div>
      </header>

      {showFilters && (
        <div className="mx-4 mt-4 rounded-2xl border border-border bg-card p-4 shadow-elevated">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-semibold">Filters</h3>
            <button onClick={() => setShowFilters(false)}>
              <X className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>
          <label className="flex items-center justify-between py-2 text-sm">
            <span>Verified sellers only</span>
            <input
              type="checkbox"
              checked={verifiedOnly}
              onChange={(e) => setVerifiedOnly(e.target.checked)}
              className="h-5 w-5 accent-[--color-primary]"
            />
          </label>
          <label className="block py-2 text-sm">
            <span className="mb-1.5 block text-muted-foreground">Max price (ETB)</span>
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value === "" ? "" : Number(e.target.value))}
              placeholder="No limit"
              className="w-full rounded-xl border border-border bg-input px-3 py-2 text-sm focus:border-primary focus:outline-none"
            />
          </label>
        </div>
      )}

      <section className="mt-4 space-y-3 px-4">
        <p className="text-xs text-muted-foreground">{filtered.length} results</p>
        {filtered.map((l) => (
          <ProductCard key={l.id} listing={l} />
        ))}
        {filtered.length === 0 && (
          <div className="rounded-2xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
            No listings match your filters.
          </div>
        )}
      </section>
    </AppShell>
  );
}

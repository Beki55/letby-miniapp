import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { TrustScore } from "@/components/ui-extras/TrustScore";
import { ProductCard } from "@/components/ui-extras/ProductCard";
import { getSeller, listings, reviews } from "@/lib/mock";
import { ArrowLeft, MessageCircle, ShieldCheck, Star } from "lucide-react";

export const Route = createFileRoute("/profile/$id")({
  component: SellerProfile,
});

function SellerProfile() {
  const { id } = useParams({ from: "/profile/$id" });
  const s = getSeller(id);
  const sellerListings = listings.filter((l) => l.seller.id === s.id);

  return (
    <AppShell>
      <header className="px-4 pt-6">
        <Link to="/marketplace" className="flex h-10 w-10 items-center justify-center rounded-full bg-surface border border-border">
          <ArrowLeft className="h-5 w-5" />
        </Link>
      </header>

      <section className="px-4 pt-4">
        <div className="rounded-3xl border border-border bg-gradient-to-br from-card via-surface to-card p-5">
          <div className="flex items-center gap-4">
            <img src={s.avatar} alt={s.name} className="h-20 w-20 rounded-2xl object-cover ring-2 ring-primary/40" />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <h1 className="truncate text-lg font-bold">{s.name}</h1>
                {s.verified && <ShieldCheck className="h-5 w-5 text-success" />}
              </div>
              <p className="text-xs text-muted-foreground">{s.username} · since {s.joinedYear}</p>
              <div className="mt-2"><TrustScore score={s.trustScore} verified={s.verified} size="md" /></div>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2 text-center">
            {[
              { label: "Sales", value: s.totalSales },
              { label: "Reply", value: s.responseTime },
              { label: "Rating", value: "4.8" },
            ].map((it) => (
              <div key={it.label} className="rounded-xl bg-background/40 py-2">
                <p className="text-sm font-bold">{it.value}</p>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{it.label}</p>
              </div>
            ))}
          </div>
          <Link
            to="/chat"
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl gradient-primary py-2.5 text-sm font-semibold text-primary-foreground"
          >
            <MessageCircle className="h-4 w-4" /> Message seller
          </Link>
        </div>
      </section>

      <section className="mt-6 px-4">
        <h2 className="mb-3 text-sm font-semibold">Listings ({sellerListings.length})</h2>
        <div className="space-y-3">
          {sellerListings.map((l) => <ProductCard key={l.id} listing={l} />)}
        </div>
      </section>

      <section className="mt-6 px-4">
        <h2 className="mb-3 text-sm font-semibold">Recent reviews</h2>
        <div className="space-y-3">
          {reviews.map((r) => (
            <div key={r.id} className="flex gap-3 rounded-2xl border border-border bg-card p-3">
              <img src={r.avatar} alt="" className="h-9 w-9 rounded-full" />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold">{r.buyer}</p>
                  <div className="flex">
                    {Array.from({ length: r.rating }).map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-primary text-primary" />
                    ))}
                  </div>
                </div>
                <p className="mt-0.5 text-xs text-muted-foreground">{r.comment}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </AppShell>
  );
}

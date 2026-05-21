import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { TrustScore } from "@/components/ui-extras/TrustScore";
import { formatETB, getListing, reviews } from "@/lib/mock";
import {
  ArrowLeft, Eye, Heart, MapPin, MessageCircle, Share2, ShieldCheck, Star, Flag,
} from "lucide-react";

export const Route = createFileRoute("/listing/$id")({
  component: ListingDetail,
});

function ListingDetail() {
  const { id } = useParams({ from: "/listing/$id" });
  const l = getListing(id);

  return (
    <AppShell>
      <div className="relative">
        <img src={l.image} alt={l.title} className="aspect-square w-full object-cover" />
        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4">
          <Link to="/marketplace" className="flex h-10 w-10 items-center justify-center rounded-full bg-background/70 backdrop-blur">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="flex gap-2">
            <button className="flex h-10 w-10 items-center justify-center rounded-full bg-background/70 backdrop-blur">
              <Heart className="h-5 w-5" />
            </button>
            <button className="flex h-10 w-10 items-center justify-center rounded-full bg-background/70 backdrop-blur">
              <Share2 className="h-5 w-5" />
            </button>
          </div>
        </div>
        <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-background/70 px-2.5 py-1 text-xs backdrop-blur">
          <Eye className="h-3 w-3" /> {l.views}
        </div>
      </div>

      <section className="space-y-4 px-4 py-5">
        <div>
          <span className="rounded-full bg-surface px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            {l.category}
          </span>
          <h1 className="mt-2 text-xl font-bold leading-snug">{l.title}</h1>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-primary">ETB {formatETB(l.price)}</span>
            {l.negotiable && (
              <span className="text-xs text-muted-foreground">Min ETB {formatETB(l.minPrice)} · negotiable</span>
            )}
          </div>
          <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" /> {l.city}
            <span>·</span> {l.stock} in stock · {l.postedAt}
          </div>
        </div>

        <Link
          to="/profile/$id"
          params={{ id: l.seller.id }}
          className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3"
        >
          <img src={l.seller.avatar} alt="" className="h-12 w-12 rounded-full object-cover" />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <p className="truncate text-sm font-semibold">{l.seller.name}</p>
              {l.seller.verified && <ShieldCheck className="h-4 w-4 text-success" />}
            </div>
            <p className="truncate text-xs text-muted-foreground">
              {l.seller.totalSales} sales · responds {l.seller.responseTime}
            </p>
          </div>
          <TrustScore score={l.seller.trustScore} verified={l.seller.verified} size="md" />
        </Link>

        <div>
          <h2 className="mb-2 text-sm font-semibold">Description</h2>
          <p className="text-sm leading-relaxed text-muted-foreground">{l.description}</p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold">Reviews ({reviews.length})</h2>
            <div className="flex items-center gap-1 text-xs">
              <Star className="h-3.5 w-3.5 fill-primary text-primary" />
              <span className="font-semibold">4.8</span>
            </div>
          </div>
          <div className="mt-3 space-y-3">
            {reviews.map((r) => (
              <div key={r.id} className="flex gap-3 border-t border-border pt-3 first:border-0 first:pt-0">
                <img src={r.avatar} alt="" className="h-8 w-8 rounded-full" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold">{r.buyer}</p>
                    <div className="flex">
                      {Array.from({ length: r.rating }).map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-primary text-primary" />
                      ))}
                    </div>
                  </div>
                  <p className="mt-0.5 text-xs leading-snug text-muted-foreground">{r.comment}</p>
                  <p className="mt-1 text-[10px] text-muted-foreground">{r.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button className="flex w-full items-center justify-center gap-2 text-xs text-muted-foreground">
          <Flag className="h-3.5 w-3.5" /> Report this listing
        </button>
      </section>

      <div className="fixed inset-x-0 bottom-0 z-30 mx-auto max-w-xl border-t border-border bg-surface/95 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-xl">
        <div className="flex gap-2">
          <Link
            to="/chat"
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-border bg-card py-3 text-sm font-semibold"
          >
            <MessageCircle className="h-4 w-4" /> Negotiate
          </Link>
          <Link
            to="/checkout/$id"
            params={{ id: l.id }}
            className="flex flex-[1.4] items-center justify-center rounded-xl gradient-primary py-3 text-sm font-bold text-primary-foreground shadow-glow"
          >
            Buy now
          </Link>
        </div>
      </div>
    </AppShell>
  );
}

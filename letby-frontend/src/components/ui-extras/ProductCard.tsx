import { Link } from "@tanstack/react-router";
import type { Listing } from "@/lib/mock";
import { formatETB } from "@/lib/mock";
import { TrustScore } from "./TrustScore";
import { MapPin, Clock } from "lucide-react";

export function ProductCard({ listing }: { listing: Listing }) {
  return (
    <Link
      to="/listing/$id"
      params={{ id: listing.id }}
      className="group flex gap-3 rounded-2xl border border-border bg-card p-3 transition-all hover:border-primary/50 hover:shadow-elevated"
    >
      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-muted">
        <img
          src={listing.image}
          alt={listing.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {listing.negotiable && (
          <span className="absolute left-1 top-1 rounded-md bg-background/80 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-primary backdrop-blur">
            Negotiable
          </span>
        )}
      </div>
      <div className="flex min-w-0 flex-1 flex-col justify-between py-0.5">
        <div className="min-w-0">
          <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-foreground">
            {listing.title}
          </h3>
          <div className="mt-1 flex items-baseline gap-1">
            <span className="text-base font-bold text-primary">
              ETB {formatETB(listing.price)}
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
            <MapPin className="h-3 w-3" /> {listing.city}
            <span className="mx-1">·</span>
            <Clock className="h-3 w-3" /> {listing.postedAt}
          </div>
          <TrustScore score={listing.seller.trustScore} verified={listing.seller.verified} />
        </div>
      </div>
    </Link>
  );
}

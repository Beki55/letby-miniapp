import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { ArrowLeft, BadgeCheck, MapPin } from "lucide-react";
import { formatETB, getListing } from "@/lib/mock";

export const Route = createFileRoute("/checkout/$id")({
  component: Checkout,
});

const cities = ["Addis Ababa", "Dire Dawa", "Adama", "Hawassa", "Bahir Dar", "Mekelle"];

const payments = [
  { id: "cbe", name: "CBE Birr", img: "🏦" },
  { id: "telebirr", name: "Telebirr", img: "📱" },
  { id: "dashen", name: "Dashen Amole", img: "💳" },
  { id: "awash", name: "Awash Birr", img: "🏧" },
] as const;

function Checkout() {
  const { id } = useParams({ from: "/checkout/$id" });
  const l = getListing(id);
  const [city, setCity] = useState("Addis Ababa");
  const [payment, setPayment] = useState<string>("telebirr");
  const [cod, setCod] = useState(false);

  const delivery = 150;
  const vat = Math.round(l.price * 0.15);
  const total = l.price + delivery;

  return (
    <AppShell>
      <header className="flex items-center gap-3 px-4 pt-6 pb-3">
        <Link to="/listing/$id" params={{ id: l.id }} className="flex h-10 w-10 items-center justify-center rounded-full bg-surface border border-border">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-lg font-bold">Checkout</h1>
      </header>

      <section className="space-y-5 px-4 pb-32">
        <div className="flex gap-3 rounded-2xl border border-border bg-card p-3">
          <img src={l.image} alt="" className="h-16 w-16 rounded-xl object-cover" />
          <div className="min-w-0 flex-1">
            <p className="line-clamp-2 text-sm font-semibold">{l.title}</p>
            <p className="mt-1 text-sm font-bold text-primary">ETB {formatETB(l.price)}</p>
          </div>
        </div>

        <div>
          <h2 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Delivery city
          </h2>
          <div className="flex items-center rounded-xl border border-border bg-input px-3">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full bg-transparent py-3 pl-3 text-sm focus:outline-none"
            >
              {cities.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
        </div>

        <div>
          <h2 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Payment method
          </h2>
          <div className="grid grid-cols-2 gap-2">
            {payments.map((p) => {
              const active = payment === p.id && !cod;
              return (
                <button
                  key={p.id}
                  onClick={() => { setPayment(p.id); setCod(false); }}
                  className={`flex items-center gap-2 rounded-xl border p-3 text-left text-sm font-semibold transition ${
                    active ? "border-primary bg-primary/10 text-foreground shadow-glow" : "border-border bg-card text-muted-foreground"
                  }`}
                >
                  <span className="text-xl">{p.img}</span>
                  {p.name}
                </button>
              );
            })}
          </div>
          <button
            onClick={() => setCod(true)}
            className={`mt-2 flex w-full items-center justify-between rounded-xl border p-3 text-sm font-semibold transition ${
              cod ? "border-primary bg-primary/10 text-foreground" : "border-border bg-card text-muted-foreground"
            }`}
          >
            <span>💵 Cash on Delivery</span>
            <span className="text-[10px] uppercase tracking-wider">Verify on receipt</span>
          </button>
        </div>

        <div className="rounded-2xl border border-border bg-card p-4">
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Order summary
          </h2>
          <Row label="Subtotal" value={`ETB ${formatETB(l.price)}`} />
          <Row label="Delivery" value={`ETB ${formatETB(delivery)}`} />
          <Row label="VAT (15%)" value={`Included`} muted />
          <div className="my-3 border-t border-border" />
          <Row label="Total" value={`ETB ${formatETB(total)}`} bold />
          <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-success/15 px-2.5 py-1 text-[10px] font-semibold text-success">
            <BadgeCheck className="h-3 w-3" /> VAT included · Receipt provided
          </div>
          <p className="mt-2 text-[10px] text-muted-foreground">
            Equivalent VAT portion: ETB {formatETB(vat)}
          </p>
        </div>
      </section>

      <div className="fixed inset-x-0 bottom-0 z-30 mx-auto max-w-xl border-t border-border bg-surface/95 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-xl">
        <button className="w-full rounded-xl gradient-primary py-3.5 text-sm font-bold text-primary-foreground shadow-glow">
          Place order · ETB {formatETB(total)}
        </button>
      </div>
    </AppShell>
  );
}

function Row({ label, value, bold, muted }: { label: string; value: string; bold?: boolean; muted?: boolean }) {
  return (
    <div className="flex items-center justify-between py-1 text-sm">
      <span className={muted ? "text-muted-foreground" : ""}>{label}</span>
      <span className={`tabular-nums ${bold ? "text-base font-bold text-primary" : muted ? "text-muted-foreground" : "font-semibold"}`}>
        {value}
      </span>
    </div>
  );
}

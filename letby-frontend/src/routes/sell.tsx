import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { ArrowLeft, Camera, Plus, X } from "lucide-react";
import { categories } from "@/lib/mock";

export const Route = createFileRoute("/sell")({
  head: () => ({
    meta: [{ title: "Sell — Letby" }],
  }),
  component: CreateListing,
});

function CreateListing() {
  const [images, setImages] = useState<string[]>([
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=70",
    "https://images.unsplash.com/photo-1600185365778-7cd5b8d4f4d6?auto=format&fit=crop&w=400&q=70",
  ]);
  const [cat, setCat] = useState("Fashion");
  const [negotiable, setNegotiable] = useState(true);

  const slots = Array.from({ length: 5 });

  return (
    <AppShell>
      <header className="sticky top-0 z-20 flex items-center justify-between border-b border-border bg-background/85 px-4 py-4 backdrop-blur-xl">
        <Link to="/" className="flex items-center gap-2 text-sm text-muted-foreground">
          <ArrowLeft className="h-5 w-5" /> Discard
        </Link>
        <h1 className="text-base font-semibold">New listing</h1>
        <button className="rounded-full bg-primary px-4 py-1.5 text-xs font-bold text-primary-foreground">
          Save
        </button>
      </header>

      <section className="space-y-6 px-4 py-5">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Photos · {images.length}/5
          </p>
          <div className="grid grid-cols-3 gap-2">
            {slots.map((_, i) => {
              const src = images[i];
              if (!src)
                return (
                  <button
                    key={i}
                    onClick={() => setImages((p) => [...p, `https://picsum.photos/seed/x${Date.now() + i}/300`])}
                    className="flex aspect-square items-center justify-center rounded-xl border-2 border-dashed border-border bg-surface/40 text-muted-foreground transition hover:border-primary"
                  >
                    {i === images.length ? <Camera className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
                  </button>
                );
              return (
                <div key={i} className="relative aspect-square overflow-hidden rounded-xl border border-border">
                  <img src={src} alt="" className="h-full w-full object-cover" />
                  <button
                    onClick={() => setImages((p) => p.filter((_, idx) => idx !== i))}
                    className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-background/80 backdrop-blur"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                  {i === 0 && (
                    <span className="absolute bottom-1 left-1 rounded bg-primary px-1.5 py-0.5 text-[9px] font-bold uppercase text-primary-foreground">
                      Cover
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <Field label="Title">
          <input
            placeholder="e.g. iPhone 13 Pro 256GB"
            className="w-full rounded-xl border border-border bg-input px-3 py-3 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none"
          />
        </Field>

        <Field label="Category">
          <div className="scrollbar-hide -mx-4 flex gap-2 overflow-x-auto px-4">
            {categories.filter((c) => c !== "All").map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`whitespace-nowrap rounded-full border px-3.5 py-2 text-xs font-semibold ${
                  cat === c
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-surface text-muted-foreground"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </Field>

        <Field label="Description">
          <textarea
            rows={4}
            placeholder="Condition, accessories, why you're selling…"
            className="w-full resize-none rounded-xl border border-border bg-input px-3 py-3 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none"
          />
        </Field>

        <div className="grid grid-cols-2 gap-3">
          <Field label="Price">
            <ETBInput placeholder="0" />
          </Field>
          <Field label="Min price">
            <ETBInput placeholder="0" />
          </Field>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Field label="Stock">
            <input
              type="number"
              defaultValue={1}
              className="w-full rounded-xl border border-border bg-input px-3 py-3 text-sm focus:border-primary focus:outline-none"
            />
          </Field>
          <Field label="City">
            <select className="w-full rounded-xl border border-border bg-input px-3 py-3 text-sm focus:border-primary focus:outline-none">
              <option>Addis Ababa</option>
              <option>Dire Dawa</option>
              <option>Adama</option>
              <option>Hawassa</option>
              <option>Bahir Dar</option>
            </select>
          </Field>
        </div>

        <label className="flex items-center justify-between rounded-xl border border-border bg-card p-4">
          <div>
            <p className="text-sm font-semibold">Allow negotiation</p>
            <p className="text-xs text-muted-foreground">Buyers can offer prices via the bot</p>
          </div>
          <input
            type="checkbox"
            checked={negotiable}
            onChange={(e) => setNegotiable(e.target.checked)}
            className="h-5 w-5 accent-[--color-primary]"
          />
        </label>

        <div className="flex gap-2 pt-2">
          <Link
            to="/"
            className="flex-1 rounded-xl border border-border bg-card py-3 text-center text-sm font-semibold text-muted-foreground"
          >
            Discard
          </Link>
          <button className="flex-[2] rounded-xl gradient-primary py-3 text-sm font-bold text-primary-foreground shadow-glow">
            Publish listing
          </button>
        </div>
      </section>
    </AppShell>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}

function ETBInput({ placeholder }: { placeholder?: string }) {
  return (
    <div className="flex items-center rounded-xl border border-border bg-input focus-within:border-primary">
      <span className="border-r border-border px-3 py-3 text-xs font-bold text-muted-foreground">ETB</span>
      <input
        type="number"
        placeholder={placeholder}
        className="w-full bg-transparent px-3 py-3 text-sm focus:outline-none"
      />
    </div>
  );
}

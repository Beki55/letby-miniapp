import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState, useEffect } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { Bot, Send, Sparkles } from "lucide-react";
import { formatETB, listings } from "@/lib/mock";

export const Route = createFileRoute("/chat")({
  head: () => ({ meta: [{ title: "AI Buyer Bot — Letby" }] }),
  component: ChatBot,
});

type Msg =
  | { id: string; role: "bot" | "user"; text: string }
  | { id: string; role: "bot"; cards: typeof listings };

const seed: Msg[] = [
  { id: "1", role: "bot", text: "Selam 👋 I'm your Letby buyer bot. What are you looking for today?" },
  { id: "2", role: "user", text: "Looking for an iPhone 13 under 80,000 ETB" },
  { id: "3", role: "bot", text: "Found 1 match from verified sellers. Want me to negotiate?" },
  { id: "4", role: "bot", cards: listings.filter((l) => l.title.includes("iPhone")) },
];

const suggestions = ["Negotiate price", "Check trust score", "Schedule meet", "Send to seller"];

function ChatBot() {
  const [msgs, setMsgs] = useState<Msg[]>(seed);
  const [draft, setDraft] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs]);

  const send = (text: string) => {
    if (!text.trim()) return;
    const uMsg: Msg = { id: Date.now() + "u", role: "user", text };
    setMsgs((m) => [...m, uMsg]);
    setDraft("");
    setTimeout(() => {
      setMsgs((m) => [...m, {
        id: Date.now() + "b",
        role: "bot",
        text: "Got it. I'll message the seller and try to bring the price down to ETB 72,000. I'll ping you when they respond.",
      }]);
    }, 700);
  };

  return (
    <AppShell>
      <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-border bg-background/85 px-4 py-4 backdrop-blur-xl">
        <div className="flex h-10 w-10 items-center justify-center rounded-full gradient-primary shadow-glow">
          <Bot className="h-5 w-5 text-primary-foreground" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-bold">Letby Buyer Bot</p>
          <p className="flex items-center gap-1 text-[11px] text-success">
            <span className="h-1.5 w-1.5 rounded-full bg-success" /> Online · AI-powered
          </p>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-primary/15 px-2 py-1 text-[10px] font-semibold text-primary">
          <Sparkles className="h-3 w-3" /> Beta
        </span>
      </header>

      <section className="space-y-3 px-4 py-5">
        {msgs.map((m) => {
          if ("cards" in m) {
            return (
              <div key={m.id} className="space-y-2">
                {m.cards.map((c) => (
                  <div key={c.id} className="ml-0 max-w-[85%] rounded-2xl border border-border bg-card p-3">
                    <div className="flex gap-3">
                      <img src={c.image} alt="" className="h-16 w-16 rounded-xl object-cover" />
                      <div className="min-w-0 flex-1">
                        <p className="line-clamp-2 text-xs font-semibold">{c.title}</p>
                        <p className="mt-0.5 text-sm font-bold text-primary">ETB {formatETB(c.price)}</p>
                        <p className="text-[10px] text-muted-foreground">
                          {c.seller.name} · Trust {c.seller.trustScore}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            );
          }
          const isUser = m.role === "user";
          return (
            <div key={m.id} className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-snug ${
                isUser
                  ? "rounded-br-md bg-primary text-primary-foreground"
                  : "rounded-bl-md bg-card text-foreground border border-border"
              }`}>
                {m.text}
              </div>
            </div>
          );
        })}
        <div ref={endRef} />
      </section>

      <div className="fixed inset-x-0 bottom-16 z-30 mx-auto max-w-xl px-3">
        <div className="scrollbar-hide flex gap-2 overflow-x-auto pb-2">
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => send(s)}
              className="whitespace-nowrap rounded-full border border-border bg-surface/90 px-3 py-1.5 text-xs font-medium text-foreground backdrop-blur hover:border-primary hover:text-primary"
            >
              {s}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 rounded-2xl border border-border bg-surface/95 p-2 shadow-elevated backdrop-blur-xl">
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send(draft)}
            placeholder="Ask the bot anything…"
            className="flex-1 bg-transparent px-2 py-2 text-sm placeholder:text-muted-foreground focus:outline-none"
          />
          <button
            onClick={() => send(draft)}
            className="flex h-9 w-9 items-center justify-center rounded-xl gradient-primary text-primary-foreground"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </AppShell>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { ArrowLeft, Camera, CheckCircle2, Upload, UserCheck } from "lucide-react";

export const Route = createFileRoute("/verification")({
  head: () => ({ meta: [{ title: "Verification — Letby" }] }),
  component: Verification,
});

function Verification() {
  const [idUploaded, setIdUploaded] = useState(false);
  const [selfieUploaded, setSelfieUploaded] = useState(false);

  return (
    <AppShell>
      <header className="flex items-center gap-3 px-4 pt-6 pb-3">
        <Link to="/settings" className="flex h-10 w-10 items-center justify-center rounded-full bg-surface border border-border">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-lg font-bold">Get Verified</h1>
      </header>

      <section className="px-4">
        <div className="rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/15 to-accent/10 p-4">
          <UserCheck className="h-7 w-7 text-primary" />
          <p className="mt-2 text-sm font-semibold">Build buyer trust faster</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Verified sellers get a badge, higher visibility and 3× more messages.
          </p>
        </div>

        <div className="mt-6 space-y-4">
          <Step
            n={1}
            title="National ID or Passport"
            subtitle="Upload a clear photo of your ID"
            done={idUploaded}
          >
            <button
              onClick={() => setIdUploaded(true)}
              className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border bg-surface/50 py-8 text-sm font-medium text-muted-foreground hover:border-primary hover:text-primary"
            >
              {idUploaded ? <CheckCircle2 className="h-5 w-5 text-success" /> : <Upload className="h-5 w-5" />}
              {idUploaded ? "ID uploaded" : "Tap to upload"}
            </button>
          </Step>

          <Step
            n={2}
            title="Selfie verification"
            subtitle="Take a selfie holding your ID"
            done={selfieUploaded}
          >
            <button
              onClick={() => setSelfieUploaded(true)}
              className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border bg-surface/50 py-8 text-sm font-medium text-muted-foreground hover:border-primary hover:text-primary"
            >
              {selfieUploaded ? <CheckCircle2 className="h-5 w-5 text-success" /> : <Camera className="h-5 w-5" />}
              {selfieUploaded ? "Selfie captured" : "Open camera"}
            </button>
          </Step>

          <Step n={3} title="Contact details" subtitle="So buyers can reach you">
            <div className="space-y-3">
              <input
                placeholder="+251 9 ..."
                className="w-full rounded-xl border border-border bg-input px-3 py-3 text-sm focus:border-primary focus:outline-none"
              />
              <input
                placeholder="@telegram_username"
                className="w-full rounded-xl border border-border bg-input px-3 py-3 text-sm focus:border-primary focus:outline-none"
              />
            </div>
          </Step>
        </div>

        <button className="mt-8 w-full rounded-xl gradient-primary py-3.5 text-sm font-bold text-primary-foreground shadow-glow">
          Submit for review
        </button>
        <p className="mt-2 text-center text-[11px] text-muted-foreground">
          Reviews take up to 24 hours.
        </p>
      </section>
    </AppShell>
  );
}

function Step({
  n, title, subtitle, done, children,
}: { n: number; title: string; subtitle: string; done?: boolean; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4">
      <div className="mb-3 flex items-center gap-3">
        <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
          done ? "bg-success text-success-foreground" : "bg-surface text-muted-foreground"
        }`}>
          {done ? <CheckCircle2 className="h-4 w-4" /> : n}
        </div>
        <div>
          <p className="text-sm font-semibold">{title}</p>
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        </div>
      </div>
      {children}
    </div>
  );
}

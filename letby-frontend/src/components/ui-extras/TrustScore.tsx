import { ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export function TrustScore({ score, verified, size = "sm" }: { score: number; verified?: boolean; size?: "sm" | "md" }) {
  const tone =
    score >= 90 ? "text-success" : score >= 75 ? "text-primary" : "text-warning";
  return (
    <div className={cn("inline-flex items-center gap-1.5 rounded-full bg-surface/80 px-2 py-1", size === "md" && "px-3 py-1.5")}>
      <ShieldCheck className={cn("h-3.5 w-3.5", tone, size === "md" && "h-4 w-4")} />
      <span className={cn("text-[11px] font-semibold tabular-nums", tone, size === "md" && "text-xs")}>
        {score}
      </span>
      {verified && <span className="text-[10px] font-medium text-muted-foreground">Verified</span>}
    </div>
  );
}

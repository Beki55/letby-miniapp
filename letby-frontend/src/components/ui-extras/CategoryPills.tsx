import { cn } from "@/lib/utils";
import { categories, type Category } from "@/lib/mock";

export function CategoryPills({
  active,
  onChange,
}: {
  active: Category;
  onChange: (c: Category) => void;
}) {
  return (
    <div className="scrollbar-hide -mx-4 flex gap-2 overflow-x-auto px-4 pb-1">
      {categories.map((c) => {
        const isActive = c === active;
        return (
          <button
            key={c}
            type="button"
            onClick={() => onChange(c)}
            className={cn(
              "whitespace-nowrap rounded-full border px-4 py-2 text-xs font-semibold transition-all",
              isActive
                ? "border-primary bg-primary text-primary-foreground shadow-glow"
                : "border-border bg-surface text-muted-foreground hover:text-foreground",
            )}
          >
            {c}
          </button>
        );
      })}
    </div>
  );
}

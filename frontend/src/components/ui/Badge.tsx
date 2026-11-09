import type { ReactNode } from "react";

import { cn } from "../../lib/utils";

export type BadgeTone =
  | "neutral"
  | "todo"
  | "in-progress"
  | "done"
  | "low"
  | "medium"
  | "high";

export interface BadgeProps {
  tone?: BadgeTone;
  children?: ReactNode;
  className?: string;
}

const TONE_CONFIG: Record<
  BadgeTone,
  { label: string; dotClassName: string }
> = {
  neutral: { label: "Neutral", dotClassName: "bg-line-strong" },
  todo: { label: "To do", dotClassName: "bg-muted" },
  "in-progress": { label: "In progress", dotClassName: "bg-teal" },
  done: { label: "Done", dotClassName: "bg-brand-bright" },
  low: { label: "Low", dotClassName: "bg-muted" },
  medium: { label: "Medium", dotClassName: "bg-amber" },
  high: { label: "High", dotClassName: "bg-danger" },
};

export function Badge({ tone = "neutral", children, className }: BadgeProps) {
  const config = TONE_CONFIG[tone];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-[2px] border border-line-strong bg-surface px-2 py-1 font-mono text-[10px] font-medium uppercase leading-none tracking-[0.14em] text-ink",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn("size-1.5 rounded-full", config.dotClassName)}
      />
      {children ?? config.label}
    </span>
  );
}

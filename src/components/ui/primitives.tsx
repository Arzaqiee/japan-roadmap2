import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

export function Card({ className, children, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={clsx(
        "rounded-card border border-ink-950/10 bg-paper-50 shadow-card animate-pop-in",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

export function ProgressBar({ percent, className }: { percent: number; className?: string }) {
  const clamped = Math.max(0, Math.min(100, percent));
  return (
    <div className={clsx("h-2 w-full overflow-hidden rounded-full bg-ink-950/8", className)}>
      <div
        className="h-full rounded-full bg-ink-950 transition-[width] duration-500 ease-out"
        style={{ width: `${clamped}%` }}
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
      />
    </div>
  );
}

/** The one recurring "signature" accent: a hanko (red ink stamp) seal used
 * only for streaks, achievements, and completed stages — never decoratively. */
export function SealBadge({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1 rounded-full border border-accent-soul/25 bg-accent-soul/10 px-2.5 py-1 text-xs font-semibold text-accent-soul",
        className
      )}
    >
      {children}
    </span>
  );
}

export function Button({
  className,
  variant = "primary",
  children,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary" | "ghost" }) {
  return (
    <button
      className={clsx(
        "min-h-[48px] rounded-2xl px-5 text-sm font-semibold tracking-wide transition-transform active:scale-[0.97] disabled:opacity-40",
        variant === "primary" && "bg-ink-950 text-paper-50",
        variant === "secondary" && "border border-ink-950/15 bg-paper-50 text-ink-950",
        variant === "ghost" && "text-ink-950 underline underline-offset-4",
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
}

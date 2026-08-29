import type { ReactNode } from "react";
import clsx from "clsx";

export function Screen({
  children,
  className,
  noPadding = false,
}: {
  children: ReactNode;
  className?: string;
  noPadding?: boolean;
}) {
  return (
    <main
      className={clsx(
        "safe-top mx-auto min-h-screen w-full max-w-md bg-paper-100 pb-28",
        !noPadding && "px-5 pt-4",
        className
      )}
    >
      {children}
    </main>
  );
}

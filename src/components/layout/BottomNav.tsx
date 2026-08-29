import { NavLink } from "react-router-dom";
import { Home, Map, Swords, RotateCcw, User } from "lucide-react";
import clsx from "clsx";

const items = [
  { to: "/", label: "Home", icon: Home, end: true },
  { to: "/roadmap", label: "Roadmap", icon: Map, end: false },
  { to: "/practice", label: "Practice", icon: Swords, end: false },
  { to: "/review", label: "Review", icon: RotateCcw, end: false },
  { to: "/profile", label: "Profile", icon: User, end: false },
];

export function BottomNav() {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-ink-950/10 bg-paper-50/95 backdrop-blur safe-bottom"
      aria-label="Navigasi utama"
    >
      <ul className="mx-auto flex max-w-md items-stretch justify-between px-2">
        {items.map(({ to, label, icon: Icon, end }) => (
          <li key={to} className="flex-1">
            <NavLink
              to={to}
              end={end}
              className={({ isActive }) =>
                clsx(
                  "flex flex-col items-center gap-1 py-2.5 text-[11px] font-medium transition-colors active:scale-95",
                  isActive ? "text-ink-950" : "text-ink-400"
                )
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={clsx(
                      "flex h-9 w-9 items-center justify-center rounded-2xl transition-colors",
                      isActive && "bg-ink-950 text-paper-50"
                    )}
                  >
                    <Icon size={20} strokeWidth={isActive ? 2.4 : 1.9} />
                  </span>
                  {label}
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

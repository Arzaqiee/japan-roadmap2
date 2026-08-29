/**
 * Placeholder illustration system. Every icon is original line-art built
 * from basic shapes (torii, sakura, Fuji, scroll, flag) — no copyrighted
 * characters. Swap any case below with an <img src="/assets/..."> once
 * real artwork is ready; the calling code (AnimeCard, StageCard) doesn't
 * need to change.
 */
export function StageIllustration({ stageId, className }: { stageId: string; className?: string }) {
  const common = "w-full h-full";

  switch (stageId) {
    case "hiragana":
      return (
        <svg viewBox="0 0 200 140" className={className ?? common} fill="none">
          <path d="M40 40 L40 110 M160 40 L160 110 M20 40 H180 M20 46 H180" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
          <circle cx="100" cy="90" r="8" fill="currentColor" opacity="0.15" />
          <path d="M70 95c10-18 20-18 30 0M110 95c10-18 20-18 30 0" stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
        </svg>
      );
    case "katakana":
      return (
        <svg viewBox="0 0 200 140" className={className ?? common} fill="none">
          <path d="M100 20 L150 110 H50 Z" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
          <circle cx="155" cy="35" r="14" stroke="currentColor" strokeWidth="3" />
          <path d="M60 90 L140 90" stroke="currentColor" strokeWidth="3" opacity="0.5" />
        </svg>
      );
    case "basic":
      return (
        <svg viewBox="0 0 200 140" className={className ?? common} fill="none">
          <path d="M40 35 H100 V105 H40 Z M100 35 H160 V105 H100 Z" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
          <path d="M100 35 V105 M55 55 H85 M55 70 H85 M115 55 H145 M115 70 H145" stroke="currentColor" strokeWidth="2.5" opacity="0.6" />
        </svg>
      );
    case "n5":
    case "n4":
    case "n3":
    case "n2":
    case "n1":
      return (
        <svg viewBox="0 0 200 140" className={className ?? common} fill="none">
          <rect x="55" y="25" width="90" height="90" rx="6" stroke="currentColor" strokeWidth="4" />
          <rect x="45" y="35" width="90" height="90" rx="6" fill="var(--stage-bg,#fff)" stroke="currentColor" strokeWidth="4" />
          <path d="M65 60 H115 M65 78 H115 M65 96 H95" stroke="currentColor" strokeWidth="3" opacity="0.6" strokeLinecap="round" />
        </svg>
      );
    case "japan-ready":
      return (
        <svg viewBox="0 0 200 140" className={className ?? common} fill="none">
          <path d="M60 20 V120" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
          <path d="M60 25 H140 L120 45 L140 65 H60" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
          <circle cx="95" cy="45" r="10" fill="currentColor" opacity="0.85" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 200 140" className={className ?? common} fill="none">
          <circle cx="100" cy="70" r="45" stroke="currentColor" strokeWidth="4" />
        </svg>
      );
  }
}

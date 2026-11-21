import { Plane } from 'lucide-react';

export function RouteBadge() {
  return (
    <div
      className="group inline-flex items-center gap-2.5 rounded-full border border-stone-800/90 bg-stone-900/45 px-3 py-1 font-mono text-xs text-stone-300 transition-colors duration-300 hover:border-stone-700 hover:text-stone-100"
      title="Oslo, Norway (59.91° N) to Toronto, Canada (43.65° N)"
    >
      <span className="text-stone-400 transition-colors duration-300 group-hover:text-stone-200">
        OSL
      </span>
      <span className="relative flex w-14 items-center justify-center">
        <svg
          aria-hidden="true"
          viewBox="0 0 64 18"
          className="h-4 w-full overflow-visible"
          fill="none"
        >
          <path
            d="M3 14 Q 32 -1 61 14"
            stroke="currentColor"
            strokeWidth="1.5"
            className="route-arc-draw text-stone-500 transition-colors duration-300 group-hover:text-amber-300/75"
          />
          <circle cx="3" cy="14" r="2.1" className="fill-stone-400" />
          <circle
            cx="61"
            cy="14"
            r="2.3"
            className="fill-stone-300 transition-colors duration-300 group-hover:fill-amber-300"
          />
        </svg>
        <Plane
          aria-hidden="true"
          strokeWidth={2}
          className="plane-arrive absolute -top-0.5 right-3 h-3.5 w-3.5 text-amber-300 transition-transform duration-500 ease-out group-hover:translate-x-1.5 group-hover:translate-y-0.5 group-hover:rotate-12"
        />
      </span>
      <span className="text-stone-200">YYZ</span>
    </div>
  );
}

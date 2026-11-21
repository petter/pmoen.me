'use client';

import { useRouter, useSearchParams } from 'next/navigation';

interface LanguageFilterProps {
  totalCount: number;
  englishCount: number;
}

export function LanguageFilter({
  totalCount,
  englishCount,
}: LanguageFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const englishOnly = searchParams.get('englishOnly') === 'true';

  const setFilter = (nextEnglishOnly: boolean) => {
    const params = new URLSearchParams(searchParams.toString());
    if (nextEnglishOnly) {
      params.set('englishOnly', 'true');
    } else {
      params.delete('englishOnly');
    }
    const query = params.toString();
    const hash = typeof window !== 'undefined' ? window.location.hash : '';
    router.replace(`${query ? `?${query}` : '/blog'}${hash}`, {
      scroll: false,
    });
  };

  return (
    <div
      role="group"
      aria-label="Filter posts by language"
      className="enter-up flex items-center gap-6 border-b border-stone-800/80"
      style={{ animationDelay: '70ms' }}
    >
      <button
        type="button"
        aria-pressed={!englishOnly}
        onClick={() => setFilter(false)}
        className={`relative inline-flex h-11 cursor-pointer items-center gap-1.5 text-sm font-medium transition-colors duration-200 ${
          !englishOnly ? 'text-stone-50' : 'text-stone-400 hover:text-stone-200'
        }`}
      >
        <span>All posts</span>
        <span className="font-mono text-xs text-stone-400 tabular-nums">
          {totalCount}
        </span>
        {!englishOnly && (
          <span
            aria-hidden="true"
            className="absolute right-0 -bottom-px left-0 border-b-2 border-amber-300/85 forced-colors:border-[CanvasText]"
          />
        )}
      </button>

      <button
        type="button"
        aria-pressed={englishOnly}
        onClick={() => setFilter(true)}
        className={`relative inline-flex h-11 cursor-pointer items-center gap-1.5 text-sm font-medium transition-colors duration-200 ${
          englishOnly ? 'text-stone-50' : 'text-stone-400 hover:text-stone-200'
        }`}
      >
        <span>English only</span>
        <span className="font-mono text-xs text-stone-400 tabular-nums">
          {englishCount}
        </span>
        {englishOnly && (
          <span
            aria-hidden="true"
            className="absolute right-0 -bottom-px left-0 border-b-2 border-amber-300/85 forced-colors:border-[CanvasText]"
          />
        )}
      </button>
    </div>
  );
}

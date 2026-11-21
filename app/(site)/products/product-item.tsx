interface ProductItemProps {
  index: number;
  href: string;
  name: string;
  description: string;
  techStack: string[];
}

export function ProductItem({
  index,
  href,
  name,
  description,
  techStack,
}: ProductItemProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group block py-8 transition-colors duration-200"
    >
      <div className="flex items-baseline justify-between gap-4">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-xs text-stone-400 tabular-nums transition-colors duration-200 group-hover:text-amber-300">
            {String(index).padStart(2, '0')}
          </span>
          <h2 className="text-xl font-medium text-stone-100 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-stone-50">
            {name}
          </h2>
        </div>

        <span
          aria-hidden="true"
          className="inline-flex h-8 w-8 shrink-0 items-center justify-end text-base text-stone-400 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-amber-300"
        >
          ↗
        </span>
      </div>

      <p className="mt-3 max-w-[56ch] leading-relaxed text-pretty text-stone-300">
        {description}
      </p>

      <p className="mt-4 font-mono text-xs leading-relaxed text-balance text-stone-400">
        {techStack.join(', ')}
      </p>
    </a>
  );
}

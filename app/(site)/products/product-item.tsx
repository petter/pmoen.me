interface ProductItemProps {
  href: string;
  name: string;
  description: string;
  techStack: string[];
}

export function ProductItem({
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
      <h2 className="text-xl font-medium text-stone-200 transition-colors duration-200 group-hover:text-stone-50">
        {name}
      </h2>
      <p className="mt-2 text-stone-400">{description}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {techStack.map((tech) => (
          <span
            key={tech}
            className="rounded-full bg-stone-800/50 px-2.5 py-0.5 text-xs text-stone-400"
          >
            {tech}
          </span>
        ))}
      </div>
      <span className="mt-3 inline-block text-xs tracking-wide text-stone-500 uppercase">
        Visit ↗
      </span>
    </a>
  );
}


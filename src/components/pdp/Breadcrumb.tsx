import Link from "next/link";

type Crumb = {
  label: string;
  href?: string;
};

export function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Brødsmulesti" className="py-3">
      <ol className="flex flex-wrap items-center gap-1 text-sm text-zinc-500">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1">
            {i > 0 && <span className="text-zinc-300">/</span>}
            {item.href && i < items.length - 1 ? (
              <Link href={item.href} className="hover:text-zinc-900 hover:underline">
                {item.label}
              </Link>
            ) : (
              <span className="text-zinc-900 font-medium">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

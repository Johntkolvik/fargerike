import Link from "next/link";
import type { NavColumn } from "@/lib/nav/types";

interface MegaMenuColumnProps {
  column: NavColumn;
}

export function MegaMenuColumn({ column }: MegaMenuColumnProps) {
  return (
    <div>
      <h3 className="text-[11px] font-semibold uppercase tracking-[0.15em] text-warm-400">
        {column.heading}
      </h3>
      <ul className="mt-3 space-y-2">
        {column.links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="inline-flex items-center gap-2 text-sm text-warm-600 transition-colors hover:text-warm-900"
            >
              {link.label}
              {link.badge && (
                <span className="rounded-full bg-warm-900 px-2 py-0.5 text-[10px] font-semibold leading-none text-white">
                  {link.badge}
                </span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

"use client";

import { useHits } from "react-instantsearch";
import Link from "next/link";

export function SearchHits() {
  const { hits } = useHits();

  if (hits.length === 0) {
    return <p className="py-8 text-center text-zinc-500">Ingen treff</p>;
  }

  return (
    <ul className="divide-y divide-zinc-200">
      {hits.map((hit) => (
        <li key={hit.objectID} className="py-4">
          <Link
            href={`/produkt/${hit.objectID}`}
            className="block hover:underline"
          >
            <span className="font-medium">
              {(hit as Record<string, unknown>).displayName as string ?? hit.objectID}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

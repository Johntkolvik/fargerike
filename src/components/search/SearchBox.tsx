"use client";

import { useState, useRef, useCallback } from "react";
import { useSearchBox } from "react-instantsearch";

export function SearchBox() {
  const { refine } = useSearchBox();
  const [value, setValue] = useState("");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const debouncedRefine = useCallback(
    (query: string) => {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        refine(query);
      }, 300);
    },
    [refine]
  );

  return (
    <form role="search">
      <input
        type="search"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          debouncedRefine(e.target.value);
        }}
        placeholder="Søk etter produkter, farger, guider..."
        aria-label="Søk"
        autoComplete="off"
        data-1p-ignore="true"
        data-lpignore="true"
        data-form-type="other"
        className="w-full rounded-lg border border-zinc-300 px-4 py-2 text-sm"
      />
    </form>
  );
}

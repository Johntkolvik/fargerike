"use client";

import { useState } from "react";
import type { Family } from "@/lib/color/types";
import SpecDrawer, { specContents, type SpecContent } from "./SpecDrawer";

function SpecCard({
  label,
  value,
  shortHelp,
  onClick,
}: {
  label: string;
  value: string;
  shortHelp: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="rounded-xl border border-warm-200 bg-white p-4 text-left transition-all hover:border-warm-400 hover:shadow-sm"
    >
      <div className="text-[11px] uppercase tracking-wider text-warm-400 font-medium">
        {label}
      </div>
      <div className="mt-1 text-base font-semibold text-warm-900">{value}</div>
      <div className="mt-1.5 text-xs text-warm-500">{shortHelp}</div>
      <div className="mt-2 text-xs font-medium text-warm-900">
        Les mer &rarr;
      </div>
    </button>
  );
}

const shortHelps: Record<string, Record<string, string>> = {
  finish: {
    "Silkematt (05)": "Lett skimmer, skjuler ujevnheter",
    "Matt (07)": "Helt matt, ingen gjenskinn",
    "Helmatt (05)": "Ekstra matt, fløyelsaktig",
    "Supermatt": "Ultra-matt, fargen helt ren",
    "Kalkmatt": "Levende, naturlig kalkoverflate",
    "Halvblank": "Synlig glans, svært slitesterk",
  },
  washClass: {
    "Klasse 2": "Svært god - tåler vask med klut",
    "Klasse 3": "God - tåler forsiktig tørk",
    "-": "Ikke klassifisert (utendørs)",
  },
  coverage: {
    "8-10 m²/L": "~25 m² per 2.7L-spann",
    "8-12 m²/L": "~27 m² per 2.7L-spann",
    "9 m²/L": "~12 m² per 2.7L-spann",
    "5-9 m²/L": "~15 m² per 2.7L-spann",
  },
  voc: {
    "<= 1 g/L": "Svært lav - nesten luktfri",
    "<= 0.3 g/L": "Ultra-lav - anbefalt allergikere",
    "-": "Ikke oppgitt (utendørs)",
  },
};

export default function SpecsGrid({ family }: { family: Family }) {
  const [drawerContent, setDrawerContent] = useState<SpecContent | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  function openSpec(type: string, value: string) {
    const builder = specContents[type];
    if (builder) {
      setDrawerContent(builder(value));
      setDrawerOpen(true);
    }
  }

  return (
    <>
      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <SpecCard
          label="Finish"
          value={family.finishName}
          shortHelp={shortHelps.finish[family.finishName] ?? ""}
          onClick={() => openSpec("finish", family.finishName)}
        />
        <SpecCard
          label="Dekkevne"
          value={family.specs.coverage}
          shortHelp={shortHelps.coverage[family.specs.coverage] ?? ""}
          onClick={() => openSpec("coverage", family.specs.coverage)}
        />
        <SpecCard
          label="Vaskbarhet"
          value={family.specs.washClass}
          shortHelp={shortHelps.washClass[family.specs.washClass] ?? ""}
          onClick={() => openSpec("washClass", family.specs.washClass)}
        />
        <SpecCard
          label="VOC"
          value={family.specs.voc}
          shortHelp={shortHelps.voc[family.specs.voc] ?? ""}
          onClick={() => openSpec("voc", family.specs.voc)}
        />
      </div>

      <SpecDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        spec={drawerContent}
      />
    </>
  );
}

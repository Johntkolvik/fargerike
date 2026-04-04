"use client";

interface SpecDrawerProps {
  open: boolean;
  onClose: () => void;
  spec: SpecContent | null;
}

export interface SpecContent {
  title: string;
  value: string;
  visual: React.ReactNode;
  description: string;
  comparison: { label: string; value: string; description: string; active?: boolean }[];
  tip?: string;
}

export const specContents: Record<string, (value: string) => SpecContent> = {
  finish: (value) => ({
    title: "Glansgrad",
    value,
    visual: (
      <div className="flex items-end gap-1 h-24">
        {[
          { label: "Supermatt", height: "20%", gloss: 2 },
          { label: "Helmatt", height: "30%", gloss: 5 },
          { label: "Matt", height: "40%", gloss: 7 },
          { label: "Silkematt", height: "55%", gloss: 15 },
          { label: "Halvblank", height: "75%", gloss: 40 },
          { label: "Blank", height: "100%", gloss: 80 },
        ].map((g) => (
          <div key={g.label} className="flex-1 flex flex-col items-center gap-1">
            <div
              className={`w-full rounded-t-sm transition-all ${
                value.toLowerCase().includes(g.label.toLowerCase())
                  ? "bg-warm-900"
                  : "bg-warm-200"
              }`}
              style={{ height: g.height }}
            />
            <span className={`text-[9px] leading-tight text-center ${
              value.toLowerCase().includes(g.label.toLowerCase())
                ? "font-bold text-warm-900"
                : "text-warm-400"
            }`}>{g.label}</span>
          </div>
        ))}
      </div>
    ),
    description: "Glansgraden bestemmer hvor mye lys overflaten reflekterer. Lavere glans gir et mykere uttrykk og skjuler ujevnheter bedre, men er mer sårbar for merker. Høyere glans er enklere å holde ren.",
    comparison: [
      { label: "Supermatt (02)", value: "0-5%", description: "Null gjenskinn. Eksklusivt fløyelsaktig uttrykk. Viser fargen helt ren." },
      { label: "Helmatt (05)", value: "5-10%", description: "Nesten matt med et snev av dybde. Populært valg for moderne interiør." },
      { label: "Matt (07)", value: "7-12%", description: "Behagelig matt uten å være flatt. God balanse mellom uttrykk og rengjøring." },
      { label: "Silkematt (15)", value: "15-25%", description: "Lett silkeaktig skimmer. Tåler vask godt. Best for stue, gang og kjøkken." },
      { label: "Halvblank (40)", value: "40-60%", description: "Tydelig glans. Svært slitesterk. Brukes typisk på lister, vinduskarmer og dører." },
    ].map((c) => ({
      ...c,
      active: value.toLowerCase().includes(c.label.split(" (")[0].toLowerCase()),
    })),
    tip: "Tommelfingerregel: Jo mer slitasje rommet får, jo høyere glansgrad bør du velge.",
  }),

  washClass: (value) => ({
    title: "Vaskbarhetsklasse",
    value,
    visual: (
      <div className="flex gap-2 h-24 items-end">
        {[
          { cls: "Klasse 1", pct: "100%", icon: "S", label: "Skrubb" },
          { cls: "Klasse 2", pct: "75%", icon: "V", label: "Vask" },
          { cls: "Klasse 3", pct: "50%", icon: "T", label: "Tørk" },
          { cls: "Klasse 4", pct: "25%", icon: "F", label: "Forsiktig" },
          { cls: "Klasse 5", pct: "10%", icon: "!", label: "Ikke vask" },
        ].map((w) => (
          <div key={w.cls} className="flex-1 flex flex-col items-center gap-1">
            <span className="text-lg font-bold text-warm-400">{w.icon}</span>
            <div
              className={`w-full rounded-t-sm transition-all ${
                value === w.cls ? "bg-warm-900" : "bg-warm-200"
              }`}
              style={{ height: w.pct }}
            />
            <span className={`text-[9px] text-center leading-tight ${
              value === w.cls ? "font-bold text-warm-900" : "text-warm-400"
            }`}>{w.cls.replace("Klasse ", "Kl. ")}</span>
          </div>
        ))}
      </div>
    ),
    description: "Vaskbarhetsklasse (EN 13300) angir hvor mye rengjøring malingen tåler uten å ta skade. Klassifiseringen gjelder etter at malingen har herdet i minst 4 uker.",
    comparison: [
      { label: "Klasse 1", value: "Skrubbevask", description: "Tåler kraftig skrubbing med børste. Brukes sjelden på vanlige vegger." },
      { label: "Klasse 2", value: "Våtvask", description: "Tåler gjentatt vask med klut og mildt såpevann. Ideelt for kjøkken, gang og barnerom." },
      { label: "Klasse 3", value: "Lett tørk", description: "Tåler forsiktig tørk med fuktig klut. Passer godt for soverom og stue." },
      { label: "Klasse 4", value: "Svak tørk", description: "Tåler kun lett berøring med fuktig klut. For lite utsatte flater." },
      { label: "Klasse 5", value: "Ikke vaskbar", description: "Tåler ikke rengjøring. Kun for dekorative flater som tak." },
    ].map((c) => ({
      ...c,
      active: value === c.label,
    })),
    tip: "Gang, kjøkken og barnerom: velg klasse 2. Soverom og stue: klasse 3 holder.",
  }),

  coverage: (value) => ({
    title: "Dekkevne",
    value,
    visual: (
      <div className="bg-warm-100 rounded-xl p-4 flex items-center justify-center gap-6">
        <div className="text-center">
          <div className="text-3xl font-bold text-warm-900">2.7L</div>
          <div className="text-xs text-warm-500 mt-1">= ca. 12-14 m²</div>
          <div className="text-[10px] text-warm-400">med 2 strøk</div>
        </div>
        <div className="text-warm-300 text-2xl">&rarr;</div>
        <div className="text-center">
          <div className="text-lg font-semibold text-warm-900">1 soverom</div>
          <div className="text-xs text-warm-500">~12 m² veggflate</div>
        </div>
      </div>
    ),
    description: `Dekkevne ${value} betyr at én liter maling dekker dette arealet i ett strøk. Med 2 strøk (anbefalt) halveres arealet per liter.`,
    comparison: [
      { label: "Lite bad/toalett", value: "~8 m²", description: "1 x 2.7L-spann med 2 strøk" },
      { label: "Soverom", value: "~15 m²", description: "1-2 x 2.7L-spann med 2 strøk" },
      { label: "Stue", value: "~30 m²", description: "1 x 9L-spann med 2 strøk" },
      { label: "Hel leilighet", value: "~80 m²", description: "2-3 x 9L-spann med 2 strøk" },
    ],
    tip: "Bruk malingskalkulatoren under for å beregne nøyaktig behov for ditt rom.",
  }),

  voc: (value) => ({
    title: "VOC-nivå",
    value,
    visual: (
      <div className="flex items-end gap-2 h-24">
        {[
          { label: "<= 0.3", pct: "3%", desc: "Ultra-lav" },
          { label: "<= 1", pct: "8%", desc: "Svært lav" },
          { label: "<= 5", pct: "20%", desc: "Lav" },
          { label: "<= 15", pct: "50%", desc: "Middels" },
          { label: "30", pct: "100%", desc: "EU-grense" },
        ].map((v) => (
          <div key={v.label} className="flex-1 flex flex-col items-center gap-1">
            <div
              className={`w-full rounded-t-sm transition-all ${
                value.includes(v.label.replace("<= ", ""))
                  ? "bg-green-600"
                  : v.desc === "EU-grense"
                  ? "bg-red-300"
                  : "bg-warm-200"
              }`}
              style={{ height: v.pct }}
            />
            <span className={`text-[9px] text-center leading-tight ${
              value.includes(v.label.replace("<= ", ""))
                ? "font-bold text-warm-900"
                : "text-warm-400"
            }`}>{v.label} g/L</span>
          </div>
        ))}
      </div>
    ),
    description: "VOC (Volatile Organic Compounds) er flyktige kjemiske stoffer som fordamper fra malingen under og etter påføring. Lavere VOC = bedre inneklima og mindre lukt.",
    comparison: [
      { label: "<= 0.3 g/L", value: "Ultra-lav", description: "Ingen merkbar lukt. Anbefalt av NAAF for allergikere. Du kan sove i rommet samme dag." },
      { label: "<= 1 g/L", value: "Svært lav", description: "Nesten luktfri. Trygt for barnerom og soverom. Kan sove i rommet etter noen timer." },
      { label: "<= 5 g/L", value: "Lav", description: "Svak lukt som forsvinner raskt. Luft godt under og etter maling." },
      { label: "30 g/L", value: "EU-grenseverdi", description: "Maks tillatt i EU. Merkbar lukt. Krev god ventilasjon og la rommet stå minst 24 timer." },
    ].map((c) => ({
      ...c,
      active: value.includes(c.label.replace("<= ", "")),
    })),
    tip: "Har du barn eller er allergisk? Velg maling med VOC <= 1 g/L.",
  }),
};

export default function SpecDrawer({ open, onClose, spec }: SpecDrawerProps) {
  if (!spec) return null;

  return (
    <>
      <div
        className={`fixed inset-0 z-50 bg-black/30 backdrop-blur-sm transition-opacity ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />
      <div
        className={`fixed inset-y-0 right-0 z-50 w-full max-w-md bg-warm-50 shadow-2xl transition-transform duration-300 ease-out overflow-y-auto ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-warm-900">{spec.title}</h2>
            <button
              onClick={onClose}
              aria-label="Lukk"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-warm-100 text-warm-600 hover:bg-warm-200 transition-colors"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="rounded-xl bg-warm-900 text-warm-50 px-5 py-3">
            <div className="text-xs uppercase tracking-wider opacity-50">Dette produktet</div>
            <div className="text-lg font-bold mt-0.5">{spec.value}</div>
          </div>
          <div className="rounded-xl border border-warm-200 bg-white p-5">
            {spec.visual}
          </div>
          <p className="text-sm text-warm-600 leading-relaxed">{spec.description}</p>
          <div>
            <h3 className="text-sm font-semibold text-warm-900 mb-3">Sammenligning</h3>
            <div className="space-y-2">
              {spec.comparison.map((c) => (
                <div
                  key={c.label}
                  className={`rounded-xl border p-4 transition-colors ${
                    c.active
                      ? "border-warm-900 bg-warm-900/5"
                      : "border-warm-200 bg-white"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-sm font-semibold ${c.active ? "text-warm-900" : "text-warm-700"}`}>
                      {c.label}
                    </span>
                    <span className="text-xs font-medium text-warm-500">{c.value}</span>
                  </div>
                  <p className="mt-1 text-xs text-warm-500 leading-relaxed">{c.description}</p>
                  {c.active && (
                    <div className="mt-2 text-[11px] font-semibold text-warm-900 uppercase tracking-wider">
                      &larr; Denne malingen
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          {spec.tip && (
            <div className="rounded-xl bg-amber-50 border border-amber-200 p-4">
              <div className="text-xs font-semibold text-amber-800 mb-1">Tips</div>
              <p className="text-xs text-amber-700 leading-relaxed">{spec.tip}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

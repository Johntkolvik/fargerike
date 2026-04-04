import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Søk | Fargerike",
  description: "Søk etter produkter, farger og guider hos Fargerike",
  robots: "noindex",
};

export default function SearchPage() {
  // TODO: Wire up AlgoliaProvider, SearchBox and SearchHits
  return (
    <Container>
      <div className="py-12">
        <h1 className="text-3xl font-bold">Søk</h1>
        <div className="mt-6">
          <input
            type="search"
            placeholder="Søk etter produkter, farger, guider..."
            className="w-full max-w-lg rounded-lg border border-zinc-300 px-4 py-3 text-sm"
            readOnly
          />
        </div>
        <div className="mt-8">
          <p className="text-zinc-600">
            Søkeresultater fra Algolia vises her.
          </p>
        </div>
      </div>
    </Container>
  );
}

import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Finn butikk | Fargerike",
  description: "Finn din nærmeste Fargerike-butikk",
};

export default function StoresPage() {
  // TODO: Fetch all stores from Sanity using STORES_ALL_QUERY
  return (
    <Container>
      <div className="py-12">
        <h1 className="text-3xl font-bold">Finn butikk</h1>
        <p className="mt-4 text-zinc-600">
          Søk på postnummer, by eller adresse for å finne din nærmeste
          Fargerike-butikk.
        </p>

        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          {/* Kart */}
          <div className="aspect-video rounded-lg bg-zinc-200" />

          {/* Butikkliste */}
          <div>
            <p className="text-zinc-600">
              Butikkliste med 89 butikker vises her.
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";

export const revalidate = 3600;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `Fargerike ${slug} | Finn butikk`,
    description: `Åpningstider, tjenester og kontaktinfo for Fargerike ${slug}`,
  };
}

export default async function StoreProfilePage({ params }: Props) {
  const { slug } = await params;

  // TODO: Fetch store from Sanity using STORE_BY_SLUG_QUERY
  // For now, all slugs render a placeholder — replace with notFound() when Sanity data is live
  return (
    <Container>
      <div className="py-12">
        <h1 className="text-3xl font-bold capitalize">
          Fargerike {slug}
        </h1>

        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <div className="space-y-6">
            <section>
              <h2 className="text-lg font-semibold">Adresse</h2>
              <p className="text-zinc-600">Adresseinformasjon vises her.</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold">Åpningstider</h2>
              <p className="text-zinc-600">Åpningstider fra Pinmeto vises her.</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold">Tjenester</h2>
              <p className="text-zinc-600">Tilgjengelige tjenester vises her.</p>
            </section>
          </div>

          {/* Kart */}
          <div className="aspect-square rounded-lg bg-zinc-200" />
        </div>
      </div>
    </Container>
  );
}

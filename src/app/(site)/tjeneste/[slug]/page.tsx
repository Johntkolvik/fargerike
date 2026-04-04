import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";

const KNOWN_SERVICES = ["fargekonsultasjon", "fargematch", "utleie", "hjemmebesok"];

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `${slug} | Tjenester | Fargerike`,
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;

  // TODO: Fetch service from Sanity using SERVICE_BY_SLUG_QUERY
  if (!KNOWN_SERVICES.includes(slug)) {
    notFound();
  }

  return (
    <Container>
      <div className="py-12">
        <h1 className="text-3xl font-bold capitalize">{slug}</h1>

        <div className="mt-8 space-y-8">
          <section>
            <h2 className="text-lg font-semibold">Om tjenesten</h2>
            <p className="text-zinc-600">Beskrivelse, pris og varighet vises her.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold">Tilgjengelige butikker</h2>
            <p className="text-zinc-600">Butikker som tilbyr tjenesten vises her.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold">Ofte stilte spørsmål</h2>
            <p className="text-zinc-600">FAQ-seksjon vises her.</p>
          </section>
        </div>
      </div>
    </Container>
  );
}

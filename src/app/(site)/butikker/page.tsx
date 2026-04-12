import type { Metadata } from "next";
import { Suspense } from "react";
import { Container } from "@/components/ui/Container";
import { Butikkfinner } from "@/components/store/Butikkfinner";
import { Breadcrumb } from "@/components/pdp/Breadcrumb";
import { client } from "@/lib/sanity/client";
import { STORES_ALL_QUERY } from "@/lib/sanity/queries";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Finn butikk | Fargerike",
  description:
    "Finn din nærmeste Fargerike-butikk. Søk på by, postnummer eller butikknavn.",
};

async function StoreList() {
  let stores: Array<Record<string, unknown>> = [];
  try {
    stores = await client.fetch(STORES_ALL_QUERY);
  } catch (error) {
    console.error("Failed to fetch stores:", error);
  }

  // Normalize to the shape Butikkfinner expects
  const normalized = stores.map((s) => ({
    _id: s._id as string,
    name: s.name as string,
    slug: s.slug as { current: string },
    address: s.address as
      | { street?: string; postalCode?: string; city?: string }
      | undefined,
    coordinates: s.coordinates as
      | { lat: number; lng: number }
      | undefined,
    phone: s.phone as string | undefined,
    openingHours: s.openingHours as
      | { day: string; open: string; close: string }[]
      | undefined,
  }));

  if (normalized.length === 0) {
    return (
      <div className="rounded-xl border border-warm-200 bg-warm-50 p-8 text-center">
        <p className="text-warm-600">
          Ingen butikker funnet. Kjør{" "}
          <code className="rounded bg-warm-100 px-1.5 py-0.5 text-xs">
            node scripts/create-stores.mjs
          </code>{" "}
          for å opprette demobutikker.
        </p>
      </div>
    );
  }

  return <Butikkfinner stores={normalized} />;
}

export default function StoresPage() {
  const breadcrumbItems = [
    { label: "Hjem", href: "/" },
    { label: "Finn butikk" },
  ];

  return (
    <Container>
      <div className="py-8 lg:py-12">
        <Breadcrumb items={breadcrumbItems} />

        <div className="mt-2">
          <h1 className="text-3xl font-bold tracking-tight text-warm-900 lg:text-4xl">
            Finn butikk
          </h1>
          <p className="mt-3 text-lg text-warm-500">
            Søk etter by, postnummer eller butikknavn for å finne din nærmeste
            Fargerike-butikk.
          </p>
        </div>

        <div className="mt-8 max-w-2xl">
          <Suspense
            fallback={
              <div className="space-y-3">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="h-28 animate-pulse rounded-xl bg-warm-100"
                  />
                ))}
              </div>
            }
          >
            <StoreList />
          </Suspense>
        </div>
      </div>
    </Container>
  );
}

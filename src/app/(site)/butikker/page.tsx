import type { Metadata } from "next";
import { Suspense } from "react";
import { Butikkfinner } from "@/components/store/Butikkfinner";
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
    county: s.county as string | undefined,
    phone: s.phone as string | undefined,
    email: s.email as string | undefined,
    openingHours: s.openingHours as
      | { day: string; open: string; close: string }[]
      | undefined,
  }));

  if (normalized.length === 0) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="rounded-xl border border-warm-200 bg-warm-50 p-8 text-center">
          <p className="text-warm-600">
            Ingen butikker funnet. Kjor{" "}
            <code className="rounded bg-warm-100 px-1.5 py-0.5 text-xs">
              node scripts/create-all-stores.mjs
            </code>{" "}
            for a opprette butikker.
          </p>
        </div>
      </div>
    );
  }

  return <Butikkfinner stores={normalized} />;
}

export default function StoresPage() {
  return (
    <Suspense
      fallback={
        <div className="grid h-[calc(100vh-72px)] grid-cols-1 md:grid-cols-[440px_1fr]">
          <div className="flex flex-col gap-4 p-6">
            <div className="h-10 w-48 animate-pulse rounded-lg bg-warm-100" />
            <div className="h-12 animate-pulse rounded-lg bg-warm-100" />
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-16 animate-pulse rounded-lg bg-warm-100"
              />
            ))}
          </div>
          <div className="hidden animate-pulse bg-warm-50 md:block" />
        </div>
      }
    >
      <StoreList />
    </Suspense>
  );
}

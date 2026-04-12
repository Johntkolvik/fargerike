import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Breadcrumb } from "@/components/pdp/Breadcrumb";
import { JsonLd } from "@/components/seo/JsonLd";
import { client } from "@/lib/sanity/client";
import { STORE_BY_SLUG_QUERY } from "@/lib/sanity/queries";

export const revalidate = 3600;

type Props = { params: Promise<{ slug: string }> };

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
const WEEKDAY_ORDER = [
  "Mandag",
  "Tirsdag",
  "Onsdag",
  "Torsdag",
  "Fredag",
  "Lørdag",
  "Søndag",
];

function getTodayDayName(): string {
  const day = new Date().getDay();
  const idx = day === 0 ? 6 : day - 1;
  return WEEKDAY_ORDER[idx];
}

function directionsUrl(lat: number, lng: number): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
}

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  try {
    const store = await client.fetch(STORE_BY_SLUG_QUERY, { slug });
    if (store) {
      const city = store.address?.city || "";
      return {
        title: `${store.name} | Fargerike`,
        description: `Åpningstider, tjenester og kontaktinfo for ${store.name}${city ? ` i ${city}` : ""}`,
      };
    }
  } catch (error) {
    console.error("Failed to fetch store metadata:", error);
  }

  return {
    title: `Fargerike ${slug} | Finn butikk`,
    description: `Åpningstider og kontaktinfo for Fargerike ${slug}`,
  };
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default async function StoreProfilePage({ params }: Props) {
  const { slug } = await params;

  let store: Record<string, unknown> | null = null;
  try {
    store = await client.fetch(STORE_BY_SLUG_QUERY, { slug });
  } catch (error) {
    console.error("Failed to fetch store:", error);
  }

  if (!store) {
    notFound();
  }

  const name = store.name as string;
  const address = store.address as
    | { street?: string; postalCode?: string; city?: string }
    | undefined;
  const coordinates = store.coordinates as
    | { lat: number; lng: number }
    | undefined;
  const phone = store.phone as string | undefined;
  const email = store.email as string | undefined;
  const openingHours = store.openingHours as
    | { day: string; open: string; close: string }[]
    | undefined;
  const services = store.services as
    | { _id: string; title: string; slug: { current: string }; serviceType?: string }[]
    | undefined;

  const todayName = getTodayDayName();
  const fullAddress = [address?.street, address?.postalCode, address?.city]
    .filter(Boolean)
    .join(", ");

  const breadcrumbItems = [
    { label: "Hjem", href: "/" },
    { label: "Finn butikk", href: "/butikker" },
    { label: name },
  ];

  // Sort opening hours in weekday order
  const sortedHours = openingHours
    ? [...openingHours].sort(
        (a, b) => WEEKDAY_ORDER.indexOf(a.day) - WEEKDAY_ORDER.indexOf(b.day)
      )
    : [];

  return (
    <>
      {/* JSON-LD: LocalBusiness */}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Store",
          name,
          ...(fullAddress ? { address: fullAddress } : {}),
          ...(phone ? { telephone: phone } : {}),
          ...(email ? { email } : {}),
          ...(coordinates
            ? {
                geo: {
                  "@type": "GeoCoordinates",
                  latitude: coordinates.lat,
                  longitude: coordinates.lng,
                },
              }
            : {}),
        }}
      />

      {/* BreadcrumbList JSON-LD */}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: breadcrumbItems.map((item, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: item.label,
            ...(item.href
              ? { item: `https://fargerike.no${item.href}` }
              : {}),
          })),
        }}
      />

      <Container>
        <div className="py-8 lg:py-12">
          <Breadcrumb items={breadcrumbItems} />

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-warm-900 lg:text-4xl">
            {name}
          </h1>

          <div className="mt-8 grid gap-8 lg:grid-cols-3">
            {/* Main info column */}
            <div className="space-y-8 lg:col-span-2">
              {/* Address */}
              <section>
                <h2 className="text-sm font-semibold uppercase tracking-wide text-warm-400">
                  Adresse
                </h2>
                <div className="mt-2 space-y-1">
                  {address?.street && (
                    <p className="text-warm-800">{address.street}</p>
                  )}
                  {(address?.postalCode || address?.city) && (
                    <p className="text-warm-800">
                      {[address.postalCode, address.city]
                        .filter(Boolean)
                        .join(" ")}
                    </p>
                  )}
                </div>
                {coordinates && (
                  <a
                    href={directionsUrl(coordinates.lat, coordinates.lng)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-2 rounded-lg bg-warm-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-warm-800"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path
                        d="M8 1L14 8l-6 7M14 8H2"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Få veibeskrivelse
                  </a>
                )}
              </section>

              {/* Opening hours */}
              {sortedHours.length > 0 && (
                <section>
                  <h2 className="text-sm font-semibold uppercase tracking-wide text-warm-400">
                    Åpningstider
                  </h2>
                  <table className="mt-2 w-full text-sm">
                    <tbody>
                      {sortedHours.map((h) => {
                        const isToday = h.day === todayName;
                        const isClosed =
                          h.open === "Stengt" || h.close === "Stengt";
                        return (
                          <tr
                            key={h.day}
                            className={
                              isToday
                                ? "font-semibold text-warm-900"
                                : "text-warm-600"
                            }
                          >
                            <td className="py-1.5 pr-6">{h.day}</td>
                            <td className="py-1.5">
                              {isClosed ? (
                                <span className="text-warm-400">Stengt</span>
                              ) : (
                                `${h.open}–${h.close}`
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </section>
              )}

              {/* Services */}
              {services && services.length > 0 && (
                <section>
                  <h2 className="text-sm font-semibold uppercase tracking-wide text-warm-400">
                    Tjenester
                  </h2>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {services.map((s) => (
                      <Link
                        key={s._id}
                        href={`/tjenester/${s.slug.current}`}
                        className="rounded-full border border-warm-200 bg-warm-50 px-3 py-1.5 text-sm text-warm-700 transition-colors hover:border-warm-300 hover:bg-warm-100"
                      >
                        {s.title}
                      </Link>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Sidebar: contact card */}
            <aside>
              <div className="rounded-xl border border-warm-200 bg-warm-50 p-6">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-warm-400">
                  Kontakt
                </h2>
                <div className="mt-3 space-y-3">
                  {phone && (
                    <div className="flex items-center gap-3">
                      <svg
                        className="flex-shrink-0 text-warm-400"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                      >
                        <path
                          d="M6.62 7.79c.85 1.72 2.26 3.13 3.98 3.98l1.33-1.33a1 1 0 011.02-.24c1.12.37 2.33.57 3.55.57a1 1 0 011 1V15a1 1 0 01-1 1C7.61 16 1 9.39 1 1.5a1 1 0 011-1h3.23a1 1 0 011 1c0 1.22.2 2.43.57 3.55a1 1 0 01-.24 1.02L5.29 7.4"
                          stroke="currentColor"
                          strokeWidth="1.3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <a
                        href={`tel:${phone.replace(/\s/g, "")}`}
                        className="text-sm text-warm-800 hover:underline"
                      >
                        {phone}
                      </a>
                    </div>
                  )}
                  {email && (
                    <div className="flex items-center gap-3">
                      <svg
                        className="flex-shrink-0 text-warm-400"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                      >
                        <rect
                          x="1"
                          y="3"
                          width="16"
                          height="12"
                          rx="2"
                          stroke="currentColor"
                          strokeWidth="1.3"
                        />
                        <path
                          d="M1 5l8 5 8-5"
                          stroke="currentColor"
                          strokeWidth="1.3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <a
                        href={`mailto:${email}`}
                        className="text-sm text-warm-800 hover:underline break-all"
                      >
                        {email}
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Back to store list */}
              <Link
                href="/butikker"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-warm-600 hover:text-warm-900 transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M9 3L5 7l4 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Tilbake til butikkoversikten
              </Link>
            </aside>
          </div>
        </div>
      </Container>
    </>
  );
}

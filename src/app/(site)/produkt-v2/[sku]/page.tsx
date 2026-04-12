import { permanentRedirect } from "next/navigation";

type Props = { params: Promise<{ sku: string }> };

/**
 * Redirects /produkt-v2/[sku] to /produkt/[sku]?variant=editorial.
 * The editorial hero is now a toggle variant on the main PDP page.
 */
export default async function ProductV2Page({ params }: Props) {
  const { sku } = await params;
  permanentRedirect(`/produkt/${sku}?variant=editorial`);
}

import { SiteHeader } from "@/components/nav/SiteHeader";
import ColorSubNav from "@/components/color/ColorSubNav";
import SiteFooter from "@/components/layout/SiteFooter";
import { CartProvider } from "@/context/CartContext";
import { FavoritesProvider } from "@/context/FavoritesContext";

export default function FargeLayout({ children }: { children: React.ReactNode }) {
  return (
    <FavoritesProvider>
      <CartProvider>
        <a href="#color-main" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold">
          Hopp til hovedinnhold
        </a>
        <SiteHeader />
        <ColorSubNav />
        <main id="color-main" className="flex-1">{children}</main>
        <SiteFooter />
      </CartProvider>
    </FavoritesProvider>
  );
}

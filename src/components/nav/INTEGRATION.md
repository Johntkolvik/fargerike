# Layout Integration Plan

How to wire up SiteHeader, ColorSubNav, MobileDrawer, and SiteFooter once all
components are ready. **Do not apply these changes until all four components
exist and have been reviewed.**

---

## 1. `(site)/layout.tsx` — swap Header to SiteHeader + add SiteFooter

Current:
```tsx
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function SiteLayout({ children }) {
  return (
    <CartProvider>
      <Header />
      <main id="main-content" className="flex-1">{children}</main>
      <Footer />
    </CartProvider>
  );
}
```

Target:
```tsx
import SiteHeader from "@/components/nav/SiteHeader";
import SiteFooter from "@/components/nav/SiteFooter";

export default function SiteLayout({ children }) {
  return (
    <CartProvider>
      <a href="#main-content" className="sr-only focus:not-sr-only …">
        Hopp til hovedinnhold
      </a>
      <SiteHeader />
      <main id="main-content" className="flex-1">{children}</main>
      <SiteFooter />
    </CartProvider>
  );
}
```

Notes:
- SiteHeader already includes MobileDrawer internally (hamburger trigger).
- CartProvider must stay at this level since SiteHeader's UtilityBar shows
  the cart icon/count.
- The old `Header` and `Footer` components in `src/components/layout/` can
  be removed after the swap, but keep them until we verify everything works.

---

## 2. `(color)/farge/layout.tsx` — replace ColorLayout with SiteHeader + ColorSubNav

Current:
```tsx
import ColorLayout from "@/components/color/ColorLayout";

export default function FargeLayout({ children }) {
  return <ColorLayout>{children}</ColorLayout>;
}
```

ColorLayout currently wraps everything in FavoritesProvider + CartProvider and
renders its own nav bar (logo, pill tabs, cart button). We need to decompose
this into the shared SiteHeader + the color-specific ColorSubNav.

Target:
```tsx
import SiteHeader from "@/components/nav/SiteHeader";
import SiteFooter from "@/components/nav/SiteFooter";
import ColorSubNav from "@/components/color/ColorSubNav";
import { FavoritesProvider } from "@/context/FavoritesContext";
import { CartProvider } from "@/context/CartContext";

export default function FargeLayout({ children }: { children: React.ReactNode }) {
  return (
    <FavoritesProvider>
      <CartProvider>
        <div className="min-h-screen bg-warm-50 text-warm-700">
          <a href="#color-main" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold">
            Hopp til hovedinnhold
          </a>
          <SiteHeader />
          <ColorSubNav />
          <main id="color-main">{children}</main>
          <SiteFooter />
        </div>
      </CartProvider>
    </FavoritesProvider>
  );
}
```

Notes:
- FavoritesProvider is needed here (but not in the site layout) because
  ColorSubNav shows a favorites badge and color pages use `useFavorites`.
- CartProvider wraps both SiteHeader (cart icon) and ColorSubNav.
- ColorSubNav uses `sticky top-16 z-30` which assumes SiteHeader is
  exactly 64px (h-16). If SiteHeader height changes, update
  ColorSubNav's `top-16` accordingly.
- The old `ColorLayout` component can be kept as a fallback during testing
  and removed once verified.

---

## 3. Provider hierarchy

```
RootLayout (html, body, fonts)
  (site)/layout.tsx
    CartProvider                  ← cart for SiteHeader UtilityBar
      SiteHeader                 ← includes MobileDrawer
      <main>{children}</main>
      SiteFooter

  (color)/farge/layout.tsx
    FavoritesProvider            ← favorites for ColorSubNav badge + color pages
      CartProvider               ← cart for SiteHeader UtilityBar + CartDrawer
        SiteHeader               ← same shared header
        ColorSubNav              ← pill tabs (reads FavoritesContext)
        <main>{children}</main>
        SiteFooter
```

---

## 4. Potential issues

| Issue | Mitigation |
|---|---|
| SiteHeader height differs from 64px | ColorSubNav's `sticky top-16` will misalign. Keep SiteHeader at h-16 or update ColorSubNav's top offset. |
| Double scroll bars on mobile | ColorSubNav uses `overflow-x-auto` for pill tabs. If SiteHeader's MobileDrawer also scrolls horizontally, test on narrow viewports. |
| CartDrawer currently lives inside ColorLayout | After the swap, CartDrawer needs to be rendered somewhere — either inside SiteHeader or at the layout level. The other agent building SiteHeader should include a cart drawer trigger. |
| Skip-to-content link ID | Site layout uses `#main-content`, color layout uses `#color-main`. Consider unifying to `#main-content` across both. |
| FavoritesProvider not in site layout | If future site pages need favorites (e.g., a wishlist page), FavoritesProvider may need to move to root layout or be added to site layout too. |
| z-index stacking | SiteHeader should be `z-40`, ColorSubNav is `z-30`. MobileDrawer overlay should be `z-50`. Verify no conflicts. |

---

## 5. Files created by each agent

| Agent | Files |
|---|---|
| Agent A (this agent) | `src/components/color/ColorSubNav.tsx` |
| Agent B | `src/components/nav/SiteHeader.tsx`, `src/components/nav/MobileDrawer.tsx` |
| Agent C | `src/components/nav/SiteFooter.tsx` |

All three agents create new files only — existing layout files are untouched
until the final integration step.

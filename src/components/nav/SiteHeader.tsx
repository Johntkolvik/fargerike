import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { NavProvider } from "./NavProvider";
import { NavBar } from "./NavBar";
import { MegaMenu } from "./MegaMenu";
import { UtilityBar } from "./UtilityBar";
import { HamburgerButton } from "./HamburgerButton";
import { MobileNav } from "./MobileNav";
import { CartNav } from "./CartNav";

export function SiteHeader() {
  return (
    <NavProvider>
      <header className="sticky top-0 z-40 border-b border-warm-200 bg-warm-50/95 backdrop-blur-sm">
        <Container>
          <div className="flex items-center h-16 gap-8">
            <Link href="/" className="shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/fargerike_logo.svg"
                alt="Fargerike"
                className="h-7"
              />
            </Link>

            <NavBar />

            <div className="flex-1" />

            <UtilityBar />

            <HamburgerButton />
          </div>
        </Container>

        <MegaMenu />
      </header>

      {/* MobileNav & CartNav OUTSIDE header — backdrop-filter on header creates a containing block that traps fixed children */}
      <MobileNav />
      <CartNav />
    </NavProvider>
  );
}

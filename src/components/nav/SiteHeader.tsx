import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { NavProvider } from "./NavProvider";
import { NavBar } from "./NavBar";
import { MegaMenu } from "./MegaMenu";
import { UtilityBar } from "./UtilityBar";
import { HamburgerButton } from "./HamburgerButton";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-warm-200 bg-warm-50/95 backdrop-blur-sm">
      <NavProvider>
        <Container>
          <div className="flex items-center h-16 gap-8">
            {/* Logo */}
            <Link href="/" className="shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/fargerike_logo.svg"
                alt="Fargerike"
                className="h-7"
              />
            </Link>

            {/* Desktop nav */}
            <NavBar />

            {/* Spacer */}
            <div className="flex-1" />

            {/* Utility icons */}
            <UtilityBar />

            {/* Mobile hamburger */}
            <HamburgerButton />
          </div>
        </Container>

        {/* Mega menu — inside a hover-bridge zone so mouse can travel from NavBar to panel */}
        <MegaMenu />
      </NavProvider>
    </header>
  );
}

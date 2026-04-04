import Link from "next/link";
import { Container } from "@/components/ui/Container";

export function Header() {
  return (
    <header className="border-b border-zinc-200 bg-white">
      <Container>
        <div className="flex h-16 items-center justify-between gap-4">
          <Link href="/" className="text-xl font-bold tracking-tight">
            Fargerike
          </Link>

          <div className="hidden flex-1 max-w-md mx-8 md:block">
            <input
              type="search"
              placeholder="Søk etter produkter, farger, guider..."
              aria-label="Søk etter produkter, farger og guider"
              className="w-full rounded-lg border border-zinc-300 px-4 py-2 text-sm"
              readOnly
            />
          </div>

          <nav className="hidden items-center gap-6 text-sm md:flex">
            <Link href="/farge" className="font-medium hover:underline">
              Utforsk farger
            </Link>
            <Link href="/farge/velger" className="hover:underline">
              Fargevelger
            </Link>
            <Link href="/farge/fargekart" className="hover:underline">
              Fargekart
            </Link>
            <Link href="/butikker" className="hover:underline">
              Finn butikk
            </Link>
          </nav>

          <button
            type="button"
            className="md:hidden p-2"
            aria-label="Meny"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </Container>
    </header>
  );
}

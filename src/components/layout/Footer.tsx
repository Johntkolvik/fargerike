import Link from "next/link";
import { Container } from "@/components/ui/Container";

export function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-zinc-50 py-12">
      <Container>
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <h3 className="mb-3 text-sm font-semibold">Kundeservice</h3>
            <ul className="space-y-2 text-sm text-zinc-600">
              <li>Telefon: 00 000 000</li>
              <li>E-post: post@fargerike.no</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold">Om Fargerike</h3>
            <ul className="space-y-2 text-sm text-zinc-600">
              <li><Link href="/butikker" className="hover:underline">Finn butikk</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold">Nyhetsbrev</h3>
            <p className="text-sm text-zinc-600">
              Få inspirasjon og tilbud rett i innboksen.
            </p>
          </div>
        </div>

        <div className="mt-8 border-t border-zinc-200 pt-6 text-center text-xs text-zinc-500">
          &copy; {new Date().getFullYear()} Fargerike
        </div>
      </Container>
    </footer>
  );
}

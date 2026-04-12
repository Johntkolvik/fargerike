"use client";

import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { FOOTER_CONFIG } from "@/lib/nav/footer-config";

/**
 * Data-driven site footer using FOOTER_CONFIG.
 * Dark warm palette, 4-column grid on desktop, newsletter + social links.
 */
export default function SiteFooter() {
  return (
    <footer className="bg-warm-900 text-warm-100">
      {/* Main sections */}
      <Container>
        <div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {FOOTER_CONFIG.sections.map((section) => (
            <div key={section.heading}>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-warm-300">
                {section.heading}
              </h3>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-warm-400 transition-colors hover:text-warm-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>

      {/* Newsletter + social */}
      <div className="border-t border-warm-800">
        <Container>
          <div className="flex flex-col gap-8 py-10 lg:flex-row lg:items-center lg:justify-between">
            {/* Newsletter */}
            <div className="max-w-md">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-warm-300">
                {FOOTER_CONFIG.newsletter.heading}
              </h3>
              <p className="mt-1 text-sm text-warm-400">
                {FOOTER_CONFIG.newsletter.description}
              </p>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="mt-4 flex gap-2"
              >
                <label htmlFor="footer-email" className="sr-only">
                  E-postadresse
                </label>
                <input
                  id="footer-email"
                  type="email"
                  placeholder="din@epost.no"
                  className="flex-1 rounded-lg border border-warm-700 bg-warm-800 px-4 py-2.5 text-sm text-warm-100 placeholder:text-warm-500 focus:border-warm-500 focus:outline-none focus:ring-1 focus:ring-warm-500"
                />
                <button
                  type="submit"
                  className="shrink-0 rounded-lg bg-warm-100 px-5 py-2.5 text-sm font-semibold text-warm-900 transition-colors hover:bg-white"
                >
                  Meld meg pa
                </button>
              </form>
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-4">
              {FOOTER_CONFIG.socialLinks.map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.platform}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-warm-700 text-warm-400 transition-colors hover:border-warm-500 hover:text-warm-200"
                >
                  <SocialIcon platform={social.platform} />
                </a>
              ))}
            </div>
          </div>
        </Container>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-warm-800">
        <Container>
          <div className="flex flex-col items-center justify-between gap-4 py-6 text-xs text-warm-500 sm:flex-row">
            <p>&copy; 2026 Fargerike. Alle rettigheter reservert.</p>
            <div className="flex gap-6">
              <Link
                href="/personvern"
                className="transition-colors hover:text-warm-300"
              >
                Personvern
              </Link>
              <Link
                href="/informasjonskapsler"
                className="transition-colors hover:text-warm-300"
              >
                Informasjonskapsler
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}

// ---------------------------------------------------------------------------
// Social icons
// ---------------------------------------------------------------------------
function SocialIcon({ platform }: { platform: string }) {
  const cls = "h-5 w-5";

  switch (platform) {
    case "facebook":
      return (
        <svg className={cls} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
        </svg>
      );
    case "instagram":
      return (
        <svg className={cls} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
        </svg>
      );
    case "pinterest":
      return (
        <svg className={cls} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
        </svg>
      );
    default:
      return null;
  }
}

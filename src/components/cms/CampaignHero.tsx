import { Container } from "@/components/ui/Container";

interface CampaignHeroProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaUrl?: string;
  backgroundColor?: string;
}

export function CampaignHero({ title, subtitle, ctaText, ctaUrl, backgroundColor }: CampaignHeroProps) {
  return (
    <section
      className="py-16"
      style={backgroundColor ? { backgroundColor } : undefined}
    >
      <Container>
        <div className="text-center">
          {title && <h2 className="text-3xl font-bold tracking-tight">{title}</h2>}
          {subtitle && <p className="mt-3 text-lg text-zinc-600">{subtitle}</p>}
          {ctaText && ctaUrl && (
            <a
              href={ctaUrl}
              className="mt-6 inline-block rounded-full bg-zinc-900 px-6 py-3 text-sm font-semibold text-white hover:bg-zinc-800"
            >
              {ctaText}
            </a>
          )}
        </div>
      </Container>
    </section>
  );
}

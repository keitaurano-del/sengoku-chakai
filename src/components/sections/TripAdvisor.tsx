import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";
import { TRIPADVISOR_URL } from "@/lib/constants";
import { Star } from "lucide-react";

export function TripAdvisor() {
  const t = useTranslations("tripadvisor");

  return (
    <section className="bg-cream py-16 sm:py-24">
      <Container>
        <FadeIn>
          <div className="mx-auto max-w-xl text-center">
            <div className="mb-6 flex items-center justify-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={20} className="fill-gold text-gold" />
              ))}
            </div>
            <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-charcoal sm:text-3xl">
              {t("heading")}
            </h2>
            <p className="mt-2 text-sm text-charcoal/50">{t("basedOn")}</p>
            <p className="mt-4 text-base text-charcoal/70">{t("description")}</p>
            <a
              href={TRIPADVISOR_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 border border-deep-green px-8 py-3 text-sm font-medium tracking-wide text-deep-green transition-all duration-300 hover:bg-deep-green hover:text-cream"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                <circle cx="6.5" cy="13.5" r="2" />
                <circle cx="17.5" cy="13.5" r="2" />
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 4c2.5 0 4.75.95 6.45 2.5H5.55C7.25 6.95 9.5 6 12 6z" opacity="0.3" />
              </svg>
              {t("cta")}
            </a>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}

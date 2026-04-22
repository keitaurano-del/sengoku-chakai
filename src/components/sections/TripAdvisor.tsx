import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/components/ui/FadeIn";
import { TRIPADVISOR_URL } from "@/lib/constants";
import { Star } from "lucide-react";

const reviews = [
  { key: "review1", flag: "🇺🇸", stars: 5 },
  { key: "review2", flag: "🇬🇧", stars: 5 },
  { key: "review3", flag: "🇦🇺", stars: 5 },
] as const;

export function TripAdvisor() {
  const t = useTranslations("tripadvisor");

  return (
    <section className="bg-cream py-14 sm:py-24">
      <Container>
        <FadeIn>
          <SectionHeading
            label={t("basedOn")}
            heading={t("heading")}
            light
          />
        </FadeIn>

        {/* Mobile: horizontal scroll carousel / Desktop: 3-col grid */}
        <div className="scroll-snap-x -mx-4 flex gap-4 px-4 sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-6 sm:px-0 sm:overflow-visible">
          {reviews.map((review, i) => (
            <FadeIn key={review.key} delay={i * 0.12} className="scroll-snap-item min-w-[80vw] shrink-0 sm:min-w-0 sm:shrink">
              <div className="flex h-full flex-col border border-charcoal/10 bg-white p-5 sm:p-6 rounded-lg sm:rounded-none">
                <div className="mb-3 flex items-center gap-3">
                  <span className="text-2xl">{review.flag}</span>
                  <div className="flex gap-0.5">
                    {[...Array(review.stars)].map((_, j) => (
                      <Star key={j} size={14} className="fill-gold text-gold" />
                    ))}
                  </div>
                </div>
                <p className="flex-1 text-sm leading-relaxed text-charcoal/70">
                  &ldquo;{t(`reviews.${review.key}.comment`)}&rdquo;
                </p>
                <p className="mt-4 text-xs font-medium text-charcoal/50">
                  {t(`reviews.${review.key}.author`)}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* CTA */}
        <FadeIn delay={0.3}>
          <div className="mt-8 text-center sm:mt-10">
            <a
              href={TRIPADVISOR_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-deep-green px-6 py-3 text-sm font-medium tracking-wide text-deep-green transition-all duration-300 hover:bg-deep-green hover:text-cream active:bg-deep-green active:text-cream sm:px-8"
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

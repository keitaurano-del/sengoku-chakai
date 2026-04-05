import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/components/ui/FadeIn";
import { PLANS } from "@/lib/constants";
import { Link } from "@/i18n/navigation";

export function Plans() {
  const t = useTranslations("plans");

  return (
    <section id="plans" className="bg-charcoal py-24 sm:py-32">
      <Container>
        <FadeIn>
          <SectionHeading
            label={t("label")}
            heading={t("heading")}
            description={t("description")}
          />
        </FadeIn>

        <div className="grid gap-8 lg:grid-cols-3">
          {PLANS.map((plan, i) => {
            const isRecommended = "recommended" in plan && plan.recommended;
            return (
              <FadeIn key={plan.id} delay={i * 0.15}>
                <div
                  className={`relative flex h-full flex-col border p-8 transition-all duration-300 hover:border-gold/50 ${
                    isRecommended
                      ? "border-gold bg-deep-green/20"
                      : "border-cream/10 bg-charcoal-light"
                  }`}
                >
                  {isRecommended && (
                    <span className="absolute -top-3 left-8 bg-gold px-4 py-1 text-xs font-bold uppercase tracking-wider text-charcoal">
                      {t("recommended")}
                    </span>
                  )}

                  <div className="mb-6">
                    <h3 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-cream">
                      {t(`${plan.id}.name`)}
                    </h3>
                    <p className="mt-1 text-sm tracking-wide text-gold">
                      {t(`${plan.id}.subtitle`)}
                    </p>
                  </div>

                  <div className="mb-6">
                    <span className="font-[family-name:var(--font-heading)] text-4xl font-bold text-cream">
                      &yen;{plan.price.toLocaleString()}
                    </span>
                    <span className="ml-2 text-sm text-cream/50">
                      {t("perPerson")}
                    </span>
                    <div className="mt-2 flex gap-4 text-xs text-cream/50">
                      <span>{plan.duration} {t("minutes")}</span>
                      <span>&bull;</span>
                      <span>{t("maxGuests", { count: plan.maxGuests })}</span>
                    </div>
                  </div>

                  <p className="mb-6 text-sm leading-relaxed text-cream/70">
                    {t(`${plan.id}.description`)}
                  </p>

                  <ul className="mb-8 flex-1 space-y-2">
                    {(t.raw(`${plan.id}.includes`) as string[]).map((item: string, j: number) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-cream/80">
                        <span className="mt-0.5 text-gold">&#9656;</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={`/booking?plan=${plan.id}`}
                    className={`block text-center py-3 text-sm font-medium uppercase tracking-[0.1em] transition-all duration-300 ${
                      isRecommended
                        ? "bg-gold text-charcoal hover:bg-gold-light"
                        : "border border-gold text-gold hover:bg-gold hover:text-charcoal"
                    }`}
                  >
                    {t("reserve")}
                  </Link>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/components/ui/FadeIn";

export function About() {
  const t = useTranslations("about");

  const features = [
    { key: "authentic" as const, icon: "◯" },
    { key: "intimate" as const, icon: "◇" },
    { key: "seasonal" as const, icon: "❋" },
  ];

  return (
    <section id="about" className="bg-cream py-24 sm:py-32">
      <Container>
        <FadeIn>
          <SectionHeading
            label={t("label")}
            heading={t("heading")}
            light
          />
        </FadeIn>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Text */}
          <FadeIn>
            <div className="space-y-6 text-base leading-relaxed text-charcoal/80">
              <p>{t("p1")}</p>
              <p>{t("p2")}</p>
              <p>{t("p3")}</p>
            </div>
          </FadeIn>

          {/* Image placeholder */}
          <FadeIn delay={0.2}>
            <div className="relative aspect-[4/5] overflow-hidden bg-deep-green/10">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-deep-green/30">
                  <p className="font-[family-name:var(--font-heading)] text-6xl">茶</p>
                  <p className="mt-2 text-sm tracking-widest">Tea Room Photo</p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Features */}
        <div className="mt-20 grid gap-8 sm:grid-cols-3">
          {features.map(({ key, icon }, i) => (
            <FadeIn key={key} delay={i * 0.1}>
              <div className="text-center">
                <span className="mb-4 block text-2xl text-gold">{icon}</span>
                <h3 className="font-[family-name:var(--font-heading)] text-xl font-semibold text-charcoal">
                  {t(`features.${key}.title`)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal/60">
                  {t(`features.${key}.description`)}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}

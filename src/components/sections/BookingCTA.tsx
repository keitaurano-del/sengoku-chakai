import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";
import { Link } from "@/i18n/navigation";

export function BookingCTA() {
  const t = useTranslations("bookingCta");

  return (
    <section className="relative overflow-hidden bg-deep-green py-24 sm:py-32">
      {/* Decorative */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 30% 50%, rgba(200,164,92,0.4) 0%, transparent 50%)",
        }}
      />

      <Container className="relative z-10 text-center">
        <FadeIn>
          <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-cream sm:text-4xl lg:text-5xl">
            {t("heading")}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-cream/70">
            {t("description")}
          </p>
          <div className="mt-10">
            <Link
              href="/booking"
              className="inline-block border border-gold bg-gold px-10 py-4 text-sm font-medium uppercase tracking-[0.15em] text-charcoal transition-all duration-300 hover:bg-transparent hover:text-gold"
            >
              {t("cta")}
            </Link>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}

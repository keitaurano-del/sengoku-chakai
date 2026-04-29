"use client";

import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { GOOGLE_FORMS } from "@/lib/constants";

export function BookingContent() {
  const t = useTranslations("booking");

  return (
    <section className="min-h-screen bg-charcoal py-24 sm:py-32">
      <Container>
        <div className="mx-auto max-w-3xl">
          {/* Header */}
          <div className="mb-12 text-center">
            <p className="mb-3 font-[family-name:var(--font-heading)] text-sm tracking-[0.3em] text-gold uppercase">
              {t("label")}
            </p>
            <h1 className="font-[family-name:var(--font-heading)] text-4xl font-bold text-cream sm:text-5xl">
              {t("heading")}
            </h1>
            <p className="mt-5 text-sm leading-relaxed text-cream/60">
              {t("description")}
            </p>
          </div>

          {/* Embedded Google Form */}
          <div className="border border-cream/10">
            <iframe
              src={GOOGLE_FORMS.booking + "?embedded=true"}
              width="100%"
              height="900"
              frameBorder="0"
              marginHeight={0}
              marginWidth={0}
              className="block bg-white"
            >
              Loading…
            </iframe>
          </div>

          {/* Fallback link */}
          <p className="mt-4 text-center text-xs text-cream/30">
            {t("note")}{" "}
            <a
              href={GOOGLE_FORMS.booking}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-gold transition-colors"
            >
              Open form in new tab
            </a>
          </p>
        </div>
      </Container>
    </section>
  );
}

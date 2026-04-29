"use client";

import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { GOOGLE_FORMS } from "@/lib/constants";

export function BookingContent() {
  const t = useTranslations("booking");

  return (
    <section className="min-h-screen bg-charcoal py-24 sm:py-32">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-4 font-[family-name:var(--font-heading)] text-sm tracking-[0.3em] text-gold uppercase">
            {t("label")}
          </p>
          <h1 className="font-[family-name:var(--font-heading)] text-4xl font-bold text-cream sm:text-5xl">
            {t("heading")}
          </h1>
          <p className="mt-6 text-base leading-relaxed text-cream/70">
            {t("description")}
          </p>

          <a
            href={GOOGLE_FORMS.booking}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-block border border-gold bg-transparent px-10 py-4 text-sm font-medium uppercase tracking-[0.15em] text-gold transition-all duration-300 hover:bg-gold hover:text-charcoal"
          >
            {t("cta")}
          </a>

          <p className="mt-6 text-xs text-cream/40">
            {t("note")}
          </p>
        </div>
      </Container>
    </section>
  );
}

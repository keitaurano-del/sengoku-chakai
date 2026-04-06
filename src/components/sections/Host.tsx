"use client";

import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/components/ui/FadeIn";
import { User } from "lucide-react";

export function Host() {
  const t = useTranslations("host");

  return (
    <section id="host" className="bg-cream py-24 sm:py-32">
      <Container>
        <FadeIn>
          <SectionHeading
            label={t("label")}
            heading={t("heading")}
            light
          />
        </FadeIn>

        <FadeIn delay={0.15}>
          <div className="mx-auto max-w-2xl text-center">
            {/* Profile placeholder */}
            <div className="mx-auto mb-8 flex h-28 w-28 items-center justify-center rounded-full bg-deep-green/10">
              <User size={48} className="text-deep-green/50" />
            </div>

            <h3 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-charcoal">
              {t("name")}
            </h3>
            <p className="mt-1 text-sm tracking-wide text-deep-green">
              {t("years")}
            </p>

            <blockquote className="mt-8 border-l-2 border-gold pl-6 text-left">
              <p className="font-[family-name:var(--font-heading)] text-lg italic leading-relaxed text-charcoal/80">
                &ldquo;{t("philosophy")}&rdquo;
              </p>
            </blockquote>

            <p className="mt-8 text-base leading-relaxed text-charcoal/70">
              {t("bio")}
            </p>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}

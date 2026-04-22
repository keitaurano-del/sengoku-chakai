"use client";

import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/components/ui/FadeIn";
import { User } from "lucide-react";

export function Host() {
  const t = useTranslations("host");

  return (
    <section id="host" className="bg-cream py-16 sm:py-24 md:py-32">
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
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-deep-green/10 sm:mb-8 sm:h-28 sm:w-28">
              <User size={36} className="text-deep-green/50 sm:hidden" />
              <User size={48} className="text-deep-green/50 hidden sm:block" />
            </div>

            <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold text-charcoal sm:text-2xl">
              {t("name")}
            </h3>
            <p className="mt-1 text-xs tracking-wide text-deep-green sm:text-sm">
              {t("years")}
            </p>

            <blockquote className="mt-6 border-l-2 border-gold pl-4 text-left sm:mt-8 sm:pl-6">
              <p className="font-[family-name:var(--font-heading)] text-base italic leading-relaxed text-charcoal/80 sm:text-lg">
                &ldquo;{t("philosophy")}&rdquo;
              </p>
            </blockquote>

            <p className="mt-6 text-sm leading-relaxed text-charcoal/70 sm:mt-8 sm:text-base">
              {t("bio")}
            </p>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}

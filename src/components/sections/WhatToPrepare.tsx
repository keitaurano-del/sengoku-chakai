"use client";

import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/components/ui/FadeIn";
import { Footprints, Watch, Flower2, Shirt } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type PrepareItem = {
  key: string;
  required: boolean;
  icon: LucideIcon;
};

const items: PrepareItem[] = [
  { key: "whiteSocks", required: true, icon: Footprints },
  { key: "removeAccessories", required: true, icon: Watch },
  { key: "avoidPerfume", required: false, icon: Flower2 },
  { key: "comfortableClothing", required: false, icon: Shirt },
];

export function WhatToPrepare() {
  const t = useTranslations("whatToPrepare");

  return (
    <section id="prepare" className="bg-charcoal py-24 sm:py-32">
      <Container>
        <FadeIn>
          <SectionHeading
            label={t("label")}
            heading={t("heading")}
            description={t("description")}
          />
        </FadeIn>

        <div className="mx-auto max-w-2xl space-y-6">
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <FadeIn key={item.key} delay={i * 0.1}>
                <div className="flex items-start gap-4 border border-cream/10 bg-charcoal-light p-6">
                  <div className="mt-0.5 shrink-0">
                    <Icon size={20} className="text-gold" />
                  </div>
                  <div className="flex-1">
                    <div className="mb-2 flex items-center gap-3">
                      <h3 className="font-[family-name:var(--font-heading)] text-lg font-semibold text-cream">
                        {t(`items.${item.key}.title`)}
                      </h3>
                      <span
                        className={`shrink-0 rounded-sm px-2 py-0.5 text-xs font-bold uppercase tracking-wider ${
                          item.required
                            ? "bg-red-900/60 text-red-300"
                            : "bg-cream/10 text-cream/50"
                        }`}
                      >
                        {item.required ? t("badgeRequired") : t("badgeIfPossible")}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-cream/60">
                      {t(`items.${item.key}.reason`)}
                    </p>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

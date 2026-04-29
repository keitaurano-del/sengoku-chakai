"use client";

import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { GOOGLE_FORMS } from "@/lib/constants";

export function CancellationContent() {
  const t = useTranslations("cancellation");

  const rules = t.raw("policy.rules") as { period: string; refund: string }[];

  return (
    <section className="min-h-screen bg-charcoal py-24 sm:py-32">
      <Container>
        <div className="mx-auto max-w-2xl">
          <div className="mb-12 text-center">
            <h1 className="font-[family-name:var(--font-heading)] text-4xl font-bold text-cream sm:text-5xl">
              {t("heading")}
            </h1>
          </div>

          {/* Policy */}
          <div className="mb-12 border border-cream/10 p-6 sm:p-8">
            <p className="mb-6 text-sm leading-relaxed text-cream/70">
              {t("policy.intro")}
            </p>
            <table className="w-full text-sm">
              <tbody>
                {rules.map((rule, i) => (
                  <tr key={i} className="border-b border-cream/10 last:border-0">
                    <td className="py-3 pr-4 text-cream/60">{rule.period}</td>
                    <td className="py-3 text-right font-medium text-cream">{rule.refund}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-6 text-xs leading-relaxed text-cream/40">
              {t("policy.note")}
            </p>
          </div>

          {/* CTA */}
          <div className="text-center">
            <p className="mb-6 text-sm text-cream/70">{t("form.description")}</p>
            <a
              href={GOOGLE_FORMS.cancellation}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border border-cream/40 bg-transparent px-10 py-4 text-sm font-medium uppercase tracking-[0.15em] text-cream/80 transition-all duration-300 hover:border-gold hover:text-gold"
            >
              {t("form.cta")}
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}

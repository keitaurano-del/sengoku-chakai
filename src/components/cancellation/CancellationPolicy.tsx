import { useTranslations } from "next-intl";

export function CancellationPolicy() {
  const t = useTranslations("cancellation.policy");

  const rules = t.raw("rules") as Array<{ period: string; refund: string }>;

  return (
    <div>
      <p className="mb-6 text-cream/70">{t("intro")}</p>

      <div className="overflow-hidden border border-cream/10">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-deep-green/30">
              <th className="px-4 py-3 text-left font-medium text-gold">Period</th>
              <th className="px-4 py-3 text-left font-medium text-gold">Refund</th>
            </tr>
          </thead>
          <tbody>
            {rules.map((rule: { period: string; refund: string }, i: number) => (
              <tr
                key={i}
                className="border-t border-cream/5"
              >
                <td className="px-4 py-3 text-cream/80">{rule.period}</td>
                <td className="px-4 py-3 text-cream/80">{rule.refund}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-xs text-cream/50">{t("note")}</p>
    </div>
  );
}

import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CancellationPolicy } from "@/components/cancellation/CancellationPolicy";
import { CancellationForm } from "@/components/cancellation/CancellationForm";

export default function CancellationPage() {
  const t = useTranslations("cancellation");

  return (
    <section className="bg-charcoal pt-28 pb-24">
      <Container>
        <SectionHeading heading={t("heading")} />
        <div className="mx-auto max-w-2xl space-y-16">
          <CancellationPolicy />
          <CancellationForm />
        </div>
      </Container>
    </section>
  );
}

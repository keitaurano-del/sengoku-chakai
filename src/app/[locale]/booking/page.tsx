import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BookingForm } from "@/components/booking/BookingForm";

export default function BookingPage() {
  const t = useTranslations("booking");

  return (
    <section className="bg-charcoal pt-28 pb-24">
      <Container>
        <SectionHeading heading={t("heading")} description={t("description")} />
        <BookingForm />
      </Container>
    </section>
  );
}

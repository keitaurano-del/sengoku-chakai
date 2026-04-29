import { getTranslations } from "next-intl/server";
import { BookingContent } from "@/components/booking/BookingContent";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "booking" });
  return { title: t("heading") };
}

export default function BookingPage() {
  return <BookingContent />;
}

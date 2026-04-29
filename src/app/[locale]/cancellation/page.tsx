import { getTranslations } from "next-intl/server";
import { CancellationContent } from "@/components/cancellation/CancellationContent";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "cancellation" });
  return { title: t("heading") };
}

export default function CancellationPage() {
  return <CancellationContent />;
}

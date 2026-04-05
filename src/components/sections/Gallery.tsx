import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/components/ui/FadeIn";

const galleryItems = [
  { key: "chashitsu", kanji: "茶室", span: "col-span-2 row-span-2" },
  { key: "temae", kanji: "点前", span: "" },
  { key: "wagashi", kanji: "菓子", span: "" },
  { key: "chakin", kanji: "道具", span: "col-span-2" },
  { key: "roji", kanji: "露地", span: "" },
  { key: "chabana", kanji: "花", span: "" },
] as const;

export function Gallery() {
  const t = useTranslations("gallery");

  return (
    <section id="gallery" className="bg-cream py-24 sm:py-32">
      <Container>
        <FadeIn>
          <SectionHeading
            label={t("label")}
            heading={t("heading")}
            light
          />
        </FadeIn>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {galleryItems.map(({ key, kanji, span }, i) => (
            <FadeIn key={key} delay={i * 0.08} className={span}>
              <div className="group relative aspect-square overflow-hidden bg-deep-green/10 cursor-pointer">
                {/* Placeholder */}
                <div className="absolute inset-0 flex items-center justify-center transition-all duration-500 group-hover:scale-105">
                  <div className="text-center">
                    <p className="font-[family-name:var(--font-heading)] text-4xl text-deep-green/20 transition-colors group-hover:text-deep-green/40">
                      {kanji}
                    </p>
                    <p className="mt-2 text-xs tracking-widest text-deep-green/30">
                      {t(`images.${key}`)}
                    </p>
                  </div>
                </div>
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-deep-green/0 transition-colors duration-300 group-hover:bg-deep-green/5" />
              </div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}

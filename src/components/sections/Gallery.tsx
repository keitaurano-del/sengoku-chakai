import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/components/ui/FadeIn";

const galleryItems = [
  { key: "chashitsu", kanji: "茶室" },
  { key: "temae", kanji: "点前" },
  { key: "wagashi", kanji: "菓子" },
  { key: "chakin", kanji: "道具" },
  { key: "roji", kanji: "露地" },
  { key: "chabana", kanji: "花" },
] as const;

/* Desktop spans (sm+) */
const desktopSpans = [
  "sm:col-span-2 sm:row-span-2",
  "",
  "",
  "sm:col-span-2",
  "",
  "",
];

export function Gallery() {
  const t = useTranslations("gallery");

  return (
    <section id="gallery" className="bg-cream py-16 sm:py-24 md:py-32">
      <Container>
        <FadeIn>
          <SectionHeading
            label={t("label")}
            heading={t("heading")}
            light
          />
        </FadeIn>

        {/* Mobile: simple 2-col equal grid / Desktop: 4-col with spans */}
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-4">
          {galleryItems.map(({ key, kanji }, i) => (
            <FadeIn key={key} delay={i * 0.06} className={desktopSpans[i]}>
              <div className="group relative aspect-square overflow-hidden rounded-md bg-deep-green/10 cursor-pointer sm:rounded-none active:scale-[0.98] transition-transform duration-200">
                {/* Placeholder */}
                <div className="absolute inset-0 flex items-center justify-center transition-all duration-500 group-hover:scale-105">
                  <div className="text-center">
                    <p className="font-[family-name:var(--font-heading)] text-3xl text-deep-green/20 transition-colors group-hover:text-deep-green/40 sm:text-4xl">
                      {kanji}
                    </p>
                    <p className="mt-1 text-[10px] tracking-widest text-deep-green/30 sm:mt-2 sm:text-xs">
                      {t(`images.${key}`)}
                    </p>
                  </div>
                </div>
                {/* Hover/touch overlay */}
                <div className="absolute inset-0 bg-deep-green/0 transition-colors duration-300 group-hover:bg-deep-green/5 group-active:bg-deep-green/10" />
              </div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}

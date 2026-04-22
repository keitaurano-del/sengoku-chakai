import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { CONTACT, TRIPADVISOR_URL } from "@/lib/constants";

export function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");

  return (
    <footer className="border-t border-cream/10 bg-charcoal">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid gap-8 sm:gap-12 md:grid-cols-3">
          {/* Brand */}
          <div>
            <p className="font-[family-name:var(--font-heading)] text-xl font-bold text-cream sm:text-2xl">
              円茶会
            </p>
            <p className="mt-2 text-sm leading-relaxed text-cream/50 sm:mt-3">
              {t("tagline")}
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="mb-3 text-xs font-medium uppercase tracking-[0.15em] text-gold sm:mb-4 sm:text-sm">
              {t("links")}
            </h3>
            <ul className="flex flex-wrap gap-x-6 gap-y-2 sm:flex-col sm:space-y-2 sm:gap-0">
              <li>
                <a href="/#experience" className="text-sm text-cream/60 transition-colors hover:text-gold active:text-gold">
                  {nav("about")}
                </a>
              </li>
              <li>
                <a href="/#plans" className="text-sm text-cream/60 transition-colors hover:text-gold active:text-gold">
                  {nav("plans")}
                </a>
              </li>
              <li>
                <Link href="/booking" className="text-sm text-cream/60 transition-colors hover:text-gold active:text-gold">
                  {nav("booking")}
                </Link>
              </li>
              <li>
                <Link href="/cancellation" className="text-sm text-cream/60 transition-colors hover:text-gold active:text-gold">
                  {nav("cancellation")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-3 text-xs font-medium uppercase tracking-[0.15em] text-gold sm:mb-4 sm:text-sm">
              {t("contact")}
            </h3>
            <ul className="space-y-1.5 text-sm text-cream/60 sm:space-y-2">
              <li>{CONTACT.email}</li>
              <li>{CONTACT.phone}</li>
              <li>{CONTACT.address.en}</li>
            </ul>
            <div className="mt-4 flex gap-4 sm:mt-6">
              <a
                href={TRIPADVISOR_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-cream/60 transition-colors hover:text-gold active:text-gold"
              >
                {t("tripadvisor")}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-cream/10 pt-6 text-center text-xs text-cream/30 sm:mt-12 sm:pt-8">
          &copy; {new Date().getFullYear()} 円茶会 En Chakai. {t("rights")}
        </div>
      </div>
    </footer>
  );
}

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { CONTACT, TRIPADVISOR_URL } from "@/lib/constants";

export function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");

  return (
    <footer className="border-t border-cream/10 bg-charcoal">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-3">
          {/* Brand */}
          <div>
            <p className="font-[family-name:var(--font-heading)] text-2xl font-bold text-cream">
              千石茶会
            </p>
            <p className="mt-3 text-sm leading-relaxed text-cream/50">
              {t("tagline")}
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="mb-4 text-sm font-medium uppercase tracking-[0.15em] text-gold">
              {t("links")}
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="/#experience" className="text-sm text-cream/60 transition-colors hover:text-gold">
                  {nav("about")}
                </a>
              </li>
              <li>
                <a href="/#plans" className="text-sm text-cream/60 transition-colors hover:text-gold">
                  {nav("plans")}
                </a>
              </li>
              <li>
                <Link href="/booking" className="text-sm text-cream/60 transition-colors hover:text-gold">
                  {nav("booking")}
                </Link>
              </li>
              <li>
                <Link href="/cancellation" className="text-sm text-cream/60 transition-colors hover:text-gold">
                  {nav("cancellation")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-sm font-medium uppercase tracking-[0.15em] text-gold">
              {t("contact")}
            </h3>
            <ul className="space-y-2 text-sm text-cream/60">
              <li>{CONTACT.email}</li>
              <li>{CONTACT.phone}</li>
              <li>{CONTACT.address.en}</li>
            </ul>
            <div className="mt-6 flex gap-4">
              <a
                href={TRIPADVISOR_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-cream/60 transition-colors hover:text-gold"
              >
                {t("tripadvisor")}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-cream/10 pt-8 text-center text-xs text-cream/30">
          &copy; {new Date().getFullYear()} 千石茶会 Sengoku Chakai. {t("rights")}
        </div>
      </div>
    </footer>
  );
}

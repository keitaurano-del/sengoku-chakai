"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { Menu, X } from "lucide-react";

export function Header() {
  const t = useTranslations("nav");
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { href: "/#experience", label: t("about") },
    { href: "/#plans", label: t("plans") },
    { href: "/#gallery", label: t("gallery") },
    { href: "/#access", label: t("access") },
  ];

  return (
    <header className="fixed top-0 z-50 w-full bg-charcoal/90 backdrop-blur-md border-b border-cream/5">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="font-[family-name:var(--font-heading)] text-xl font-bold tracking-wide text-cream hover:text-gold transition-colors"
        >
          千石茶会
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm tracking-wide text-cream/70 transition-colors hover:text-gold"
            >
              {item.label}
            </a>
          ))}
          <Link
            href="/booking"
            className="bg-gold px-5 py-2 text-sm font-medium text-charcoal transition-colors hover:bg-gold-light"
          >
            {t("booking")}
          </Link>
          <LanguageSwitcher />
        </nav>

        {/* Mobile toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <LanguageSwitcher />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-cream"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <nav className="border-t border-cream/5 bg-charcoal/95 backdrop-blur-md md:hidden">
          <div className="flex flex-col px-4 py-4">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="py-3 text-sm tracking-wide text-cream/70 transition-colors hover:text-gold border-b border-cream/5"
              >
                {item.label}
              </a>
            ))}
            <Link
              href="/booking"
              onClick={() => setMobileOpen(false)}
              className="mt-4 bg-gold px-5 py-3 text-center text-sm font-medium text-charcoal transition-colors hover:bg-gold-light"
            >
              {t("booking")}
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}

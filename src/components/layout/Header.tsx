"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Header() {
  const t = useTranslations("nav");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const navItems = [
    { href: "/#experience", label: t("about") },
    { href: "/#plans", label: t("plans") },
    { href: "/#gallery", label: t("gallery") },
    { href: "/#access", label: t("access") },
  ];

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-charcoal/95 backdrop-blur-md shadow-lg shadow-black/10 border-b border-cream/5"
          : "bg-charcoal/70 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:h-16 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="font-[family-name:var(--font-heading)] text-lg font-bold tracking-wide text-cream hover:text-gold transition-colors sm:text-xl"
        >
          円茶会
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
        <div className="flex items-center gap-3 md:hidden">
          <LanguageSwitcher />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-10 w-10 items-center justify-center text-cream"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-t border-cream/5 bg-charcoal/98 backdrop-blur-md md:hidden"
          >
            <div className="flex flex-col px-4 py-3">
              {navItems.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="py-3.5 text-base tracking-wide text-cream/70 transition-colors hover:text-gold active:text-gold border-b border-cream/5"
                >
                  {item.label}
                </motion.a>
              ))}
              <Link
                href="/booking"
                onClick={() => setMobileOpen(false)}
                className="mt-4 mb-1 bg-gold px-5 py-3.5 text-center text-sm font-medium text-charcoal transition-colors hover:bg-gold-light active:bg-gold-light"
              >
                {t("booking")}
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

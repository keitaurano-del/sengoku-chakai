"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { Globe } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const localeLabels: Record<string, string> = {
  en: "EN",
  ja: "日本語",
  zh: "中文",
};

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 text-sm text-cream/80 transition-colors hover:text-gold"
        aria-label="Change language"
      >
        <Globe size={16} />
        <span>{localeLabels[locale]}</span>
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-2 min-w-[100px] overflow-hidden rounded bg-charcoal-light shadow-lg ring-1 ring-cream/10">
          {Object.entries(localeLabels).map(([loc, label]) => (
            <button
              key={loc}
              onClick={() => {
                router.replace(pathname, { locale: loc as "en" | "ja" | "zh" });
                setOpen(false);
              }}
              className={`block w-full px-4 py-2 text-left text-sm transition-colors hover:bg-deep-green/50 ${
                loc === locale ? "text-gold" : "text-cream/80"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

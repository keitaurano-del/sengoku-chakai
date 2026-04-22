"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bookingSchema, type BookingFormData } from "@/lib/schemas";
import { PLANS, TIME_SLOTS } from "@/lib/constants";
import { Link } from "@/i18n/navigation";
import { DayPicker } from "react-day-picker";
import { format, addDays } from "date-fns";
import { Check } from "lucide-react";
import "react-day-picker/style.css";

const countries = [
  "Japan", "United States", "United Kingdom", "Canada", "Australia", "Germany", "France",
  "China", "South Korea", "Taiwan", "Hong Kong", "Singapore", "Thailand",
  "Indonesia", "Philippines", "Vietnam", "India", "Brazil", "Mexico",
  "Italy", "Spain", "Netherlands", "Sweden", "Switzerland", "Other",
];

export function BookingForm() {
  const t = useTranslations("booking");
  const searchParams = useSearchParams();
  const defaultPlan = searchParams.get("plan") || "take";
  const isSuccess = searchParams.get("success") === "true";
  const [submitted, setSubmitted] = useState(isSuccess);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      plan: defaultPlan as BookingFormData["plan"],
      timeSlot: "morning",
      guests: 2,
      agreeToPolicy: false as unknown as true,
    },
  });

  const selectedDate = watch("date");
  const selectedPlan = watch("plan");

  async function onSubmit(data: BookingFormData) {
    const endpoint = process.env.NEXT_PUBLIC_STRIPE_ENABLED === "true"
      ? "/api/checkout"
      : "/api/booking";

    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (result.url) {
      window.location.href = result.url;
    } else if (res.ok) {
      setSubmitted(true);
    }
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-lg text-center py-12 px-4 sm:py-16">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-deep-green sm:mb-6 sm:h-16 sm:w-16">
          <Check size={28} className="text-gold" />
        </div>
        <h2 className="font-[family-name:var(--font-heading)] text-xl font-bold text-cream sm:text-2xl">
          {t("success.heading")}
        </h2>
        <p className="mt-3 text-sm text-cream/70 sm:mt-4 sm:text-base">{t("success.message")}</p>
        <Link
          href="/"
          className="mt-6 inline-block border border-gold px-6 py-3 text-sm text-gold transition-colors hover:bg-gold hover:text-charcoal active:bg-gold active:text-charcoal sm:mt-8 sm:px-8"
        >
          {t("success.backHome")}
        </Link>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto max-w-2xl space-y-6 px-1 sm:space-y-8"
    >
      {/* Plan selection */}
      <fieldset>
        <legend className="mb-3 text-xs font-medium uppercase tracking-[0.15em] text-gold sm:mb-4 sm:text-sm">
          {t("fields.plan")}
        </legend>
        <div className="grid gap-2 grid-cols-3 sm:gap-3">
          {PLANS.map((plan) => (
            <label
              key={plan.id}
              className={`cursor-pointer border p-3 text-center transition-all duration-200 active:scale-[0.97] sm:p-4 ${
                selectedPlan === plan.id
                  ? "border-gold bg-deep-green/20"
                  : "border-cream/10 hover:border-cream/30"
              }`}
            >
              <input
                type="radio"
                value={plan.id}
                {...register("plan")}
                className="sr-only"
              />
              <p className="font-[family-name:var(--font-heading)] text-base font-bold text-cream sm:text-lg">
                {plan.nameJa}
              </p>
              <p className="text-[10px] text-cream/50 sm:text-xs">{plan.nameEn}</p>
              <p className="mt-1 text-xs font-medium text-gold sm:mt-2 sm:text-sm">
                &yen;{plan.price.toLocaleString()}
              </p>
            </label>
          ))}
        </div>
      </fieldset>

      {/* Date picker */}
      <div>
        <label className="mb-3 block text-xs font-medium uppercase tracking-[0.15em] text-gold sm:mb-4 sm:text-sm">
          {t("fields.date")}
        </label>
        <div className="flex justify-center rounded bg-charcoal-light p-2 sm:p-4 [&_.rdp]:text-cream [&_.rdp]:text-sm [&_.rdp-day_button:hover]:bg-deep-green/50 [&_.rdp-selected_.rdp-day_button]:bg-gold [&_.rdp-selected_.rdp-day_button]:text-charcoal [&_.rdp-today:not(.rdp-selected)_.rdp-day_button]:text-gold [&_.rdp-day_button]:min-h-[44px] [&_.rdp-day_button]:min-w-[44px]">
          <DayPicker
            mode="single"
            selected={selectedDate ? new Date(selectedDate) : undefined}
            onSelect={(day) => {
              if (day) setValue("date", format(day, "yyyy-MM-dd"));
            }}
            disabled={{ before: addDays(new Date(), 2) }}
          />
        </div>
        {errors.date && (
          <p className="mt-2 text-sm text-red-400">{errors.date.message}</p>
        )}
      </div>

      {/* Time slot */}
      <div>
        <label className="mb-3 block text-xs font-medium uppercase tracking-[0.15em] text-gold sm:mb-4 sm:text-sm">
          {t("fields.timeSlot")}
        </label>
        <div className="grid gap-2 grid-cols-3 sm:gap-3">
          {TIME_SLOTS.map((slot) => (
            <label
              key={slot.id}
              className={`cursor-pointer border p-3 text-center text-sm transition-all active:scale-[0.97] ${
                watch("timeSlot") === slot.id
                  ? "border-gold bg-deep-green/20 text-cream"
                  : "border-cream/10 text-cream/60 hover:border-cream/30"
              }`}
            >
              <input
                type="radio"
                value={slot.id}
                {...register("timeSlot")}
                className="sr-only"
              />
              {t(`timeSlots.${slot.id}`)}
            </label>
          ))}
        </div>
      </div>

      {/* Guests */}
      <div>
        <label className="mb-2 block text-xs font-medium uppercase tracking-[0.15em] text-gold sm:text-sm">
          {t("fields.guests")}
        </label>
        <select
          {...register("guests", { valueAsNumber: true })}
          className="w-full border border-cream/10 bg-charcoal-light px-4 py-3 text-cream focus:border-gold focus:outline-none text-base"
        >
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>
      </div>

      {/* Personal info */}
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        <div>
          <label className="mb-2 block text-xs font-medium uppercase tracking-[0.15em] text-gold sm:text-sm">
            {t("fields.name")}
          </label>
          <input
            {...register("name")}
            className="w-full border border-cream/10 bg-charcoal-light px-4 py-3 text-cream text-base placeholder:text-cream/30 focus:border-gold focus:outline-none"
            placeholder="John Smith"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>
          )}
        </div>
        <div>
          <label className="mb-2 block text-xs font-medium uppercase tracking-[0.15em] text-gold sm:text-sm">
            {t("fields.email")}
          </label>
          <input
            type="email"
            {...register("email")}
            className="w-full border border-cream/10 bg-charcoal-light px-4 py-3 text-cream text-base placeholder:text-cream/30 focus:border-gold focus:outline-none"
            placeholder="john@example.com"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
          )}
        </div>
        <div>
          <label className="mb-2 block text-xs font-medium uppercase tracking-[0.15em] text-gold sm:text-sm">
            {t("fields.phone")}
          </label>
          <input
            type="tel"
            {...register("phone")}
            className="w-full border border-cream/10 bg-charcoal-light px-4 py-3 text-cream text-base placeholder:text-cream/30 focus:border-gold focus:outline-none"
            placeholder="+1 234 567 8900"
          />
        </div>
        <div>
          <label className="mb-2 block text-xs font-medium uppercase tracking-[0.15em] text-gold sm:text-sm">
            {t("fields.country")}
          </label>
          <select
            {...register("country")}
            className="w-full border border-cream/10 bg-charcoal-light px-4 py-3 text-cream text-base focus:border-gold focus:outline-none"
          >
            <option value="">— Select —</option>
            {countries.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          {errors.country && (
            <p className="mt-1 text-sm text-red-400">{errors.country.message}</p>
          )}
        </div>
      </div>

      {/* Special requests */}
      <div>
        <label className="mb-2 block text-xs font-medium uppercase tracking-[0.15em] text-gold sm:text-sm">
          {t("fields.requests")}
        </label>
        <textarea
          {...register("requests")}
          rows={3}
          className="w-full border border-cream/10 bg-charcoal-light px-4 py-3 text-cream text-base placeholder:text-cream/30 focus:border-gold focus:outline-none resize-none"
          placeholder="Allergies, dietary restrictions, special occasions..."
        />
      </div>

      {/* Policy agreement */}
      <label className="flex items-start gap-3 cursor-pointer py-1">
        <input
          type="checkbox"
          {...register("agreeToPolicy")}
          className="mt-1 h-5 w-5 accent-gold shrink-0"
        />
        <span className="text-sm text-cream/70">
          {t("fields.agreeToPolicy")}{" "}
          <Link href="/cancellation" className="text-gold underline">
            →
          </Link>
        </span>
      </label>
      {errors.agreeToPolicy && (
        <p className="text-sm text-red-400">{errors.agreeToPolicy.message}</p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gold py-4 text-sm font-medium uppercase tracking-[0.15em] text-charcoal transition-colors hover:bg-gold-light active:bg-gold-light disabled:opacity-50"
      >
        {isSubmitting ? t("submitting") : t("submit")}
      </button>
    </form>
  );
}

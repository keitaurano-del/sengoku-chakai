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
  "United States", "United Kingdom", "Canada", "Australia", "Germany", "France",
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
    // Try Stripe checkout first, fall back to simple booking API
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
      // Stripe checkout — redirect to payment page
      window.location.href = result.url;
    } else if (res.ok) {
      setSubmitted(true);
    }
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-lg text-center py-16">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-deep-green">
          <Check size={32} className="text-gold" />
        </div>
        <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-cream">
          {t("success.heading")}
        </h2>
        <p className="mt-4 text-cream/70">{t("success.message")}</p>
        <Link
          href="/"
          className="mt-8 inline-block border border-gold px-8 py-3 text-sm text-gold transition-colors hover:bg-gold hover:text-charcoal"
        >
          {t("success.backHome")}
        </Link>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto max-w-2xl space-y-8"
    >
      {/* Plan selection */}
      <fieldset>
        <legend className="mb-4 text-sm font-medium uppercase tracking-[0.15em] text-gold">
          {t("fields.plan")}
        </legend>
        <div className="grid gap-3 sm:grid-cols-3">
          {PLANS.map((plan) => (
            <label
              key={plan.id}
              className={`cursor-pointer border p-4 text-center transition-all duration-200 ${
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
              <p className="font-[family-name:var(--font-heading)] text-lg font-bold text-cream">
                {plan.nameJa}
              </p>
              <p className="text-xs text-cream/50">{plan.nameEn}</p>
              <p className="mt-2 text-sm font-medium text-gold">
                &yen;{plan.price.toLocaleString()}
              </p>
            </label>
          ))}
        </div>
      </fieldset>

      {/* Date picker */}
      <div>
        <label className="mb-4 block text-sm font-medium uppercase tracking-[0.15em] text-gold">
          {t("fields.date")}
        </label>
        <div className="flex justify-center rounded bg-charcoal-light p-4 [&_.rdp]:text-cream [&_.rdp-day_button:hover]:bg-deep-green/50 [&_.rdp-selected_.rdp-day_button]:bg-gold [&_.rdp-selected_.rdp-day_button]:text-charcoal [&_.rdp-today:not(.rdp-selected)_.rdp-day_button]:text-gold">
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
        <label className="mb-4 block text-sm font-medium uppercase tracking-[0.15em] text-gold">
          {t("fields.timeSlot")}
        </label>
        <div className="grid gap-3 sm:grid-cols-3">
          {TIME_SLOTS.map((slot) => (
            <label
              key={slot.id}
              className={`cursor-pointer border p-3 text-center text-sm transition-all ${
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
        <label className="mb-2 block text-sm font-medium uppercase tracking-[0.15em] text-gold">
          {t("fields.guests")}
        </label>
        <select
          {...register("guests", { valueAsNumber: true })}
          className="w-full border border-cream/10 bg-charcoal-light px-4 py-3 text-cream focus:border-gold focus:outline-none"
        >
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>
      </div>

      {/* Personal info */}
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium uppercase tracking-[0.15em] text-gold">
            {t("fields.name")}
          </label>
          <input
            {...register("name")}
            className="w-full border border-cream/10 bg-charcoal-light px-4 py-3 text-cream placeholder:text-cream/30 focus:border-gold focus:outline-none"
            placeholder="John Smith"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>
          )}
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium uppercase tracking-[0.15em] text-gold">
            {t("fields.email")}
          </label>
          <input
            type="email"
            {...register("email")}
            className="w-full border border-cream/10 bg-charcoal-light px-4 py-3 text-cream placeholder:text-cream/30 focus:border-gold focus:outline-none"
            placeholder="john@example.com"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
          )}
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium uppercase tracking-[0.15em] text-gold">
            {t("fields.phone")}
          </label>
          <input
            type="tel"
            {...register("phone")}
            className="w-full border border-cream/10 bg-charcoal-light px-4 py-3 text-cream placeholder:text-cream/30 focus:border-gold focus:outline-none"
            placeholder="+1 234 567 8900"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium uppercase tracking-[0.15em] text-gold">
            {t("fields.country")}
          </label>
          <select
            {...register("country")}
            className="w-full border border-cream/10 bg-charcoal-light px-4 py-3 text-cream focus:border-gold focus:outline-none"
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
        <label className="mb-2 block text-sm font-medium uppercase tracking-[0.15em] text-gold">
          {t("fields.requests")}
        </label>
        <textarea
          {...register("requests")}
          rows={3}
          className="w-full border border-cream/10 bg-charcoal-light px-4 py-3 text-cream placeholder:text-cream/30 focus:border-gold focus:outline-none resize-none"
          placeholder="Allergies, dietary restrictions, special occasions..."
        />
      </div>

      {/* Policy agreement */}
      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          {...register("agreeToPolicy")}
          className="mt-1 h-4 w-4 accent-gold"
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
        className="w-full bg-gold py-4 text-sm font-medium uppercase tracking-[0.15em] text-charcoal transition-colors hover:bg-gold-light disabled:opacity-50"
      >
        {isSubmitting ? t("submitting") : t("submit")}
      </button>
    </form>
  );
}

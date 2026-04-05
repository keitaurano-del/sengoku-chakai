"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cancellationSchema, type CancellationFormData } from "@/lib/schemas";
import { Check } from "lucide-react";

export function CancellationForm() {
  const t = useTranslations("cancellation.form");
  const [submitted, setSubmitted] = useState(false);
  const [refundMessage, setRefundMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CancellationFormData>({
    resolver: zodResolver(cancellationSchema),
  });

  async function onSubmit(data: CancellationFormData) {
    const res = await fetch("/api/cancellation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      const result = await res.json();
      setRefundMessage(result.message || "");
      setSubmitted(true);
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-8">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-deep-green">
          <Check size={24} className="text-gold" />
        </div>
        <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold text-cream">
          {t("success.heading")}
        </h3>
        <p className="mt-2 text-sm text-cream/70">{t("success.message")}</p>
        {refundMessage && (
          <p className="mt-3 text-sm text-gold">{refundMessage}</p>
        )}
      </div>
    );
  }

  return (
    <div>
      <h3 className="mb-2 font-[family-name:var(--font-heading)] text-xl font-bold text-cream">
        {t("heading")}
      </h3>
      <p className="mb-6 text-sm text-cream/60">{t("description")}</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium uppercase tracking-[0.15em] text-gold">
            {t("fields.email")}
          </label>
          <input
            type="email"
            {...register("email")}
            className="w-full border border-cream/10 bg-charcoal-light px-4 py-3 text-cream placeholder:text-cream/30 focus:border-gold focus:outline-none"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium uppercase tracking-[0.15em] text-gold">
            {t("fields.name")}
          </label>
          <input
            {...register("name")}
            className="w-full border border-cream/10 bg-charcoal-light px-4 py-3 text-cream placeholder:text-cream/30 focus:border-gold focus:outline-none"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium uppercase tracking-[0.15em] text-gold">
            {t("fields.bookingDate")}
          </label>
          <input
            type="date"
            {...register("bookingDate")}
            className="w-full border border-cream/10 bg-charcoal-light px-4 py-3 text-cream focus:border-gold focus:outline-none"
          />
          {errors.bookingDate && (
            <p className="mt-1 text-sm text-red-400">{errors.bookingDate.message}</p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium uppercase tracking-[0.15em] text-gold">
            {t("fields.reason")}
          </label>
          <textarea
            {...register("reason")}
            rows={3}
            className="w-full border border-cream/10 bg-charcoal-light px-4 py-3 text-cream placeholder:text-cream/30 focus:border-gold focus:outline-none resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full border border-cream/30 py-3 text-sm font-medium uppercase tracking-[0.1em] text-cream transition-colors hover:border-gold hover:text-gold disabled:opacity-50"
        >
          {isSubmitting ? t("submitting") : t("submit")}
        </button>
      </form>
    </div>
  );
}

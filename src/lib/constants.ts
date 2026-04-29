export const PLANS = [
  {
    id: "ume",
    tier: "basic",
    nameJa: "梅",
    nameEn: "Ume",
    price: 9000,
    duration: 60,
    maxGuests: 6,
  },
  {
    id: "take",
    tier: "standard",
    nameJa: "竹",
    nameEn: "Take",
    price: 15000,
    duration: 90,
    maxGuests: 4,
  },
  {
    id: "matsu",
    tier: "premium",
    nameJa: "松",
    nameEn: "Matsu",
    price: 25000,
    duration: 120,
    maxGuests: 2,
    recommended: true,
  },
] as const;

export const TIME_SLOTS = [
  { id: "morning", time: "10:00" },
  { id: "afternoon", time: "14:00" },
  { id: "evening", time: "16:00" },
] as const;

export const TRIPADVISOR_URL = "https://www.tripadvisor.com/";

export const CONTACT = {
  email: "info@en-chakai.com",
  phone: "+81-3-XXXX-XXXX",
  address: {
    en: "Sengoku, Bunkyo-ku, Tokyo",
    ja: "東京都文京区千石",
  },
  station: {
    en: "Sengoku Station (Toei Mita Line) — 5 min walk",
    ja: "都営三田線 千石駅 徒歩5分",
  },
};

// Google Form URLs — Keitaさんが作成後に差し替えてください
export const GOOGLE_FORMS = {
  booking: "https://docs.google.com/forms/d/e/BOOKING_FORM_ID/viewform",
  cancellation: "https://docs.google.com/forms/d/e/CANCEL_FORM_ID/viewform",
};

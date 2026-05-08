export interface HeroVariant {
  id: string;
  headline: { en: string; ru: string };
  sub: { en: string; ru: string };
  cta: { en: string; ru: string };
}

export const heroVariants: HeroVariant[] = [
  {
    id: "A",
    headline: { en: "Pakistan's #1 Trusted Agri Store", ru: "Pakistan Ka #1 Bharosemand Zar'ai Store" },
    sub: { en: "100% original products. COD nationwide. 12,500+ happy farmers.", ru: "100% asli products. COD poore Pakistan. 12,500+ khush kissan." },
    cta: { en: "Shop Now", ru: "Abhi Khareedein" },
  },
  {
    id: "B",
    headline: { en: "Save Up To 30% This Season", ru: "Iss Season 30% Tak Bachayein" },
    sub: { en: "Premium pesticides, herbicides & seeds at dealer prices.", ru: "Behtareen dawa, jari booti aur beej dealer rate par." },
    cta: { en: "View Deals", ru: "Deals Dekhein" },
  },
  {
    id: "C",
    headline: { en: "Free Delivery On 1000+ Products", ru: "1000+ Products Par Muft Delivery" },
    sub: { en: "Order today, delivered to your village in 2–4 days.", ru: "Aaj order karein, 2–4 din mein gaon tak." },
    cta: { en: "Start Shopping", ru: "Khareedari Shuru" },
  },
];

export function pickHeroVariant(): HeroVariant {
  let id = sessionStorage.getItem("kc-hero-variant");
  if (!id || !heroVariants.find(v => v.id === id)) {
    id = heroVariants[Math.floor(Math.random() * heroVariants.length)].id;
    sessionStorage.setItem("kc-hero-variant", id);
  }
  // log view (mock A/B impression)
  try {
    const k = "kc-hero-impr";
    const m = JSON.parse(localStorage.getItem(k) || "{}");
    m[id] = (m[id] || 0) + 1;
    localStorage.setItem(k, JSON.stringify(m));
  } catch {}
  return heroVariants.find(v => v.id === id)!;
}

import { useLanguage } from "@/contexts/LanguageContext";

const PARTNERS = [
  { name: "TCS", logo: "TCS" },
  { name: "Leopards", logo: "LCS" },
  { name: "M&P", logo: "M&P" },
  { name: "Daewoo", logo: "DEWOO" },
  { name: "JazzCash", logo: "JC" },
  { name: "EasyPaisa", logo: "EP" },
  { name: "HBL", logo: "HBL" },
  { name: "Meezan", logo: "MZN" },
];

export default function PartnerLogos() {
  const { language } = useLanguage();
  const t = (en: string, ru: string) => (language === "ru" ? ru : en);
  return (
    <section className="py-8 bg-secondary/30 border-y border-border">
      <div className="max-w-7xl mx-auto px-4">
        <p className="text-center text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">{t("Trusted Delivery & Payment Partners", "Hamare Delivery aur Payment Partners")}</p>
        <div className="flex flex-wrap justify-center items-center gap-3 md:gap-6">
          {PARTNERS.map(p => (
            <div key={p.name} className="bg-card border border-border rounded-lg px-4 py-2 min-w-[80px] text-center hover:border-primary/50 transition-colors">
              <p className="font-extrabold text-foreground text-sm">{p.logo}</p>
              <p className="text-[10px] text-muted-foreground">{p.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { CalendarDays, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { products } from "@/data/mockData";
import ProductCard from "@/components/ProductCard";

interface SeasonInfo {
  nameEn: string;
  nameRu: string;
  descEn: string;
  descRu: string;
  crops: string[];
  months: number[];
}

const seasons: SeasonInfo[] = [
  {
    nameEn: "Kharif Season",
    nameRu: "Kharif Ka Season",
    descEn: "Rice, Cotton, Maize & Sugarcane season is here! Get your seeds, pesticides & herbicides ready.",
    descRu: "Chawal, Kapas, Makki aur Ganna ka season hai! Apne beej, dawaiyan aur jari booti ki dawa tayyar rakhein.",
    crops: ["Rice", "Cotton", "Maize", "Vegetables"],
    months: [4, 5, 6, 7, 8, 9],
  },
  {
    nameEn: "Rabi Season",
    nameRu: "Rabi Ka Season",
    descEn: "Wheat, Mustard & winter vegetable season. Prepare your fields with the right fertilizers and seeds.",
    descRu: "Gandum, Sarson aur sardi ki sabziyon ka season. Apne khetoon ko sahi khaad aur beej se tayyar karein.",
    crops: ["Wheat", "Vegetables"],
    months: [10, 11, 12, 1, 2, 3],
  },
];

export default function SeasonalCalendar() {
  const { language } = useLanguage();
  const currentMonth = new Date().getMonth() + 1;
  const currentSeason = seasons.find(s => s.months.includes(currentMonth)) || seasons[0];

  const seasonProducts = products.filter(p =>
    p.targetCrops?.some(c => currentSeason.crops.includes(c))
  ).slice(0, 4);

  return (
    <section className="py-8">
      <div className="container">
        <div className="premium-card p-5 md:p-6 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/10">
          <div className="flex items-start gap-4 mb-5">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
              <CalendarDays className="h-6 w-6 text-primary" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-lg font-extrabold text-foreground">
                  {language === "ru" ? currentSeason.nameRu : currentSeason.nameEn}
                </h2>
                <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full animate-pulse-soft">
                  {language === "ru" ? "Abhi Jaari" : "Active Now"}
                </span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {language === "ru" ? currentSeason.descRu : currentSeason.descEn}
              </p>
            </div>
          </div>

          {seasonProducts.length > 0 && (
            <>
              <p className="text-xs font-bold text-foreground mb-3 uppercase tracking-wider">
                {language === "ru" ? "Is Season Ke Products" : "Seasonal Recommendations"}
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {seasonProducts.map(p => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

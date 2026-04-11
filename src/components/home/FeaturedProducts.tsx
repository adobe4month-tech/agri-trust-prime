import { Link } from "react-router-dom";
import { products } from "@/data/mockData";
import ProductCard from "@/components/ProductCard";
import { ArrowRight, Flame, Sparkles, Clock } from "lucide-react";
import { useScrollReveal, useCountdown } from "@/hooks/useAnimations";
import { useLanguage } from "@/contexts/LanguageContext";

function CountdownTimer() {
  const { hours, minutes, seconds } = useCountdown(12);
  return (
    <div className="flex items-center gap-1.5">
      <Clock className="h-4 w-4 text-sale" />
      <div className="flex items-center gap-1">
        {[{ value: hours }, { value: minutes }, { value: seconds }].map((t, i) => (
          <span key={i} className="flex items-center">
            <span className="bg-sale text-primary-foreground text-xs font-bold px-1.5 py-0.5 rounded">{String(t.value).padStart(2, "0")}</span>
            {i < 2 && <span className="text-muted-foreground font-bold mx-0.5">:</span>}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function FeaturedProducts({ title = "Weekly Sale", filter, icon = "flame" }: { title?: string; filter?: (p: (typeof products)[0]) => boolean; icon?: "flame" | "sparkles" }) {
  const filtered = filter ? products.filter(filter) : products;
  const shown = filtered.slice(0, 8);
  const ref = useScrollReveal();
  const isSale = icon === "flame";
  const Icon = isSale ? Flame : Sparkles;
  const { t } = useLanguage();

  const displayTitle = title === "Weekly Sale" ? t("section.weeklySale") : t("section.latestProducts");

  return (
    <section className="py-12 md:py-16">
      <div ref={ref} className="container reveal-section">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-accent/20 to-agri-gold/20 flex items-center justify-center">
              <Icon className="h-4.5 w-4.5 text-accent" />
            </div>
            <h2 className="text-xl md:text-2xl font-extrabold text-foreground">{displayTitle}</h2>
            {isSale && <CountdownTimer />}
          </div>
          <Link to="/products" className="group flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 transition-colors">
            {t("section.viewAll")} <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 stagger-children revealed">
          {shown.map(p => (<ProductCard key={p.id} product={p} />))}
        </div>
      </div>
    </section>
  );
}

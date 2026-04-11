import { ShieldCheck, Truck, FlaskConical, Headphones, Award, Banknote } from "lucide-react";
import { useScrollReveal } from "@/hooks/useAnimations";
import { useLanguage } from "@/contexts/LanguageContext";

export default function TrustBar() {
  const ref = useScrollReveal(0.3);
  const { t } = useLanguage();

  const items = [
    { icon: ShieldCheck, label: t("trust.original"), accent: true },
    { icon: Banknote, label: t("trust.cod"), accent: false },
    { icon: Truck, label: t("trust.delivery"), accent: false },
    { icon: FlaskConical, label: t("trust.verified"), accent: false },
    { icon: Award, label: t("trust.brands"), accent: false },
    { icon: Headphones, label: t("trust.support"), accent: false },
  ];

  return (
    <section ref={ref} className="reveal-section bg-agri-deep relative overflow-hidden">
      <div className="absolute inset-0 shimmer pointer-events-none" />
      <div className="container py-3.5 relative">
        <div className="flex items-center justify-between gap-5 overflow-x-auto scrollbar-hide">
          {items.map((item, i) => (
            <div key={i} className="flex items-center gap-2 shrink-0 group">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-transform duration-200 group-hover:scale-105 ${item.accent ? "bg-agri-gold/20" : "bg-primary-foreground/10"}`}>
                <item.icon className={`h-4 w-4 ${item.accent ? "text-agri-gold" : "text-primary-foreground/80"}`} />
              </div>
              <span className="text-[11px] md:text-xs font-semibold text-primary-foreground/90 whitespace-nowrap">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

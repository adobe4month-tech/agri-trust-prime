import { ShieldCheck, Truck, FlaskConical, Headphones, Award, Banknote } from "lucide-react";
import { useScrollReveal } from "@/hooks/useAnimations";

const items = [
  { icon: ShieldCheck, label: "100% Original", labelUrdu: "اصل پروڈکٹس", accent: true },
  { icon: Banknote, label: "Cash on Delivery", labelUrdu: "کیش آن ڈیلیوری", accent: false },
  { icon: Truck, label: "Nationwide Delivery", labelUrdu: "ملک بھر ڈیلیوری", accent: false },
  { icon: FlaskConical, label: "Agronomist Verified", labelUrdu: "ماہر تصدیق شدہ", accent: false },
  { icon: Award, label: "35+ Top Brands", labelUrdu: "35+ برانڈز", accent: false },
  { icon: Headphones, label: "Expert Support", labelUrdu: "ماہر مدد", accent: false },
];

export default function TrustBar() {
  const ref = useScrollReveal(0.3);

  return (
    <section ref={ref} className="reveal-section bg-agri-deep relative overflow-hidden">
      <div className="absolute inset-0 shimmer pointer-events-none" />

      <div className="container py-3.5 relative">
        <div className="flex items-center justify-between gap-5 overflow-x-auto scrollbar-hide">
          {items.map((item, i) => (
            <div key={i} className="flex items-center gap-2 shrink-0 group">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-transform duration-200 group-hover:scale-105 ${
                item.accent ? "bg-agri-gold/20" : "bg-primary-foreground/10"
              }`}>
                <item.icon className={`h-4 w-4 ${item.accent ? "text-agri-gold" : "text-primary-foreground/80"}`} />
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] md:text-xs font-semibold text-primary-foreground/90 whitespace-nowrap">{item.label}</span>
                <span className="text-[9px] text-primary-foreground/40 whitespace-nowrap hidden md:block" dir="rtl">{item.labelUrdu}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

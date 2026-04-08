import { ShieldCheck, Truck, FlaskConical, Headphones, Award } from "lucide-react";
import { useScrollReveal } from "@/hooks/useAnimations";

const items = [
  { icon: ShieldCheck, label: "100% Original Products", accent: true },
  { icon: Truck, label: "Nationwide Delivery", accent: false },
  { icon: FlaskConical, label: "Agronomist Verified", accent: false },
  { icon: Award, label: "35+ Top Brands", accent: false },
  { icon: Headphones, label: "Expert Support", accent: false },
];

export default function TrustBar() {
  const ref = useScrollReveal(0.3);

  return (
    <section ref={ref} className="reveal-section relative bg-agri-deep overflow-hidden">
      {/* Shimmer overlay */}
      <div className="absolute inset-0 shimmer pointer-events-none" />

      <div className="container py-4 relative">
        <div className="flex items-center justify-between gap-6 overflow-x-auto scrollbar-hide">
          {items.map((item, i) => (
            <div key={i} className="flex items-center gap-2.5 shrink-0 group">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${
                item.accent ? "bg-agri-gold/20 shadow-glow-gold" : "bg-white/10"
              }`}>
                <item.icon className={`h-4.5 w-4.5 ${item.accent ? "text-agri-gold" : "text-white/80"}`} />
              </div>
              <span className="text-xs md:text-sm font-semibold text-white/90 whitespace-nowrap tracking-wide">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

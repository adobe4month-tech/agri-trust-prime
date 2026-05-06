import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Variant { label: string; price: number; unit: string; }
interface Props { basePrice: number; }

export default function ProductVariants({ basePrice }: Props) {
  const { language } = useLanguage();
  const variants: Variant[] = [
    { label: "250ml", price: Math.round(basePrice * 0.4), unit: "250ml" },
    { label: "500ml", price: Math.round(basePrice * 0.7), unit: "500ml" },
    { label: "1 Litre", price: basePrice, unit: "1L" },
  ];
  const [selected, setSelected] = useState(2);
  const t = (en: string, ru: string) => (language === "ru" ? ru : en);
  return (
    <div className="space-y-2">
      <p className="text-sm font-semibold text-foreground">{t("Choose Size", "Size Chunein")}</p>
      <div className="grid grid-cols-3 gap-2">
        {variants.map((v, i) => (
          <button key={i} onClick={() => setSelected(i)} className={`p-3 rounded-xl border-2 text-center transition-all ${selected === i ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}`}>
            <p className="font-bold text-sm text-foreground">{v.label}</p>
            <p className="text-xs text-muted-foreground">Rs.{v.price.toLocaleString()}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

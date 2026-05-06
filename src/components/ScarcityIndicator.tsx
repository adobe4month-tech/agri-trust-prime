import { AlertCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ScarcityIndicator({ stock }: { stock: number }) {
  const { language } = useLanguage();
  if (stock > 10) return null;
  const t = (en: string, ru: string) => (language === "ru" ? ru : en);
  return (
    <div className="flex items-center gap-2 px-3 py-2 bg-destructive/10 border border-destructive/30 rounded-lg text-destructive text-sm font-semibold">
      <AlertCircle className="h-4 w-4" />
      {stock <= 0 ? t("Sold Out", "Stock Khatam") : t(`Only ${stock} left in stock — order soon!`, `Sirf ${stock} bachay hain — abhi order karein!`)}
    </div>
  );
}

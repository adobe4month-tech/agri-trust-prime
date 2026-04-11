import { Truck } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const cities = [
  { name: "Lahore", days: "2-3" },
  { name: "Karachi", days: "3-4" },
  { name: "Faisalabad", days: "2-3" },
  { name: "Multan", days: "2-3" },
  { name: "Rawalpindi", days: "3-4" },
  { name: "Islamabad", days: "3-4" },
  { name: "Hyderabad", days: "3-4" },
  { name: "Peshawar", days: "4-5" },
  { name: "Quetta", days: "5-7" },
  { name: "Bahawalpur", days: "2-3" },
  { name: "Sahiwal", days: "2-3" },
  { name: "Rahim Yar Khan", days: "3-4" },
  { name: "Gujranwala", days: "2-3" },
  { name: "Sialkot", days: "3-4" },
];

export default function DeliveryEstimate() {
  const [selected, setSelected] = useState("");
  const { t } = useLanguage();
  const city = cities.find(c => c.name === selected);

  return (
    <div className="premium-card p-4 bg-secondary/20">
      <div className="flex items-center gap-2 mb-3">
        <Truck className="h-4 w-4 text-primary" />
        <span className="text-sm font-bold text-foreground">{t("delivery.title")}</span>
      </div>
      <select
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        className="w-full h-9 rounded-lg border border-border bg-background px-3 text-sm text-foreground focus:ring-2 focus:ring-primary/20 focus:outline-none"
      >
        <option value="">{t("delivery.selectCity")}</option>
        {cities.map(c => (
          <option key={c.name} value={c.name}>{c.name}</option>
        ))}
      </select>
      {city && (
        <div className="mt-3 flex items-center gap-2 text-sm animate-fade-in">
          <div className="w-2 h-2 rounded-full bg-trust-green animate-pulse-soft" />
          <span className="font-semibold text-foreground">{city.name}:</span>
          <span className="text-primary font-bold">{city.days} {t("delivery.days")}</span>
        </div>
      )}
    </div>
  );
}

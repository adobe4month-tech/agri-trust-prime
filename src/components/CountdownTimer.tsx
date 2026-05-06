import { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function CountdownTimer({ hours = 6 }: { hours?: number }) {
  const { language } = useLanguage();
  const [end] = useState(() => Date.now() + hours * 3600_000);
  const [now, setNow] = useState(Date.now());
  useEffect(() => { const i = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(i); }, []);
  const diff = Math.max(0, end - now);
  const h = Math.floor(diff / 3600_000);
  const m = Math.floor((diff % 3600_000) / 60_000);
  const s = Math.floor((diff % 60_000) / 1000);
  const t = (en: string, ru: string) => (language === "ru" ? ru : en);
  return (
    <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/30 rounded-xl">
      <Clock className="h-5 w-5 text-primary" />
      <div className="flex-1">
        <p className="text-xs font-semibold text-foreground">{t("Flash Deal ends in", "Flash Deal khatam hone wala hai")}</p>
        <div className="flex gap-1 mt-1">
          {[h, m, s].map((v, i) => (
            <div key={i} className="bg-foreground text-background font-mono font-bold px-2 py-1 rounded text-sm min-w-[36px] text-center">
              {String(v).padStart(2, "0")}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

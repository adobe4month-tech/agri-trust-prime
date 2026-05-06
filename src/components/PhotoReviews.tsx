import { useState } from "react";
import { Star, BadgeCheck, ThumbsUp } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const REVIEWS = [
  { name: "Muhammad Aslam", city: "Multan", rating: 5, text: "Excellent results on my cotton crop. Bollworm completely controlled within 3 days.", textUrdu: "Cotton ki fasal par zabardast asar. 3 din mein sundi khatam.", crop: "Cotton", photos: ["https://images.unsplash.com/photo-1502741338009-cac2772e18bc?w=300&h=300&fit=crop", "https://images.unsplash.com/photo-1530507629858-e3759c2c1c5e?w=300&h=300&fit=crop"], helpful: 24 },
  { name: "Imran Khan", city: "Faisalabad", rating: 5, text: "Original product, fast delivery. Will order again for next season.", textUrdu: "Asli product, jaldi delivery. Agle season phir order karunga.", crop: "Wheat", photos: ["https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=300&h=300&fit=crop"], helpful: 18 },
  { name: "Sohail Ahmad", city: "Sahiwal", rating: 4, text: "Good quality, but packaging could be better. Results are solid.", textUrdu: "Quality acchi hai, packaging behtar honi chahiye. Asar achha hai.", crop: "Rice", photos: [], helpful: 9 },
];

export default function PhotoReviews() {
  const { language } = useLanguage();
  const [helpfulMap, setHelpfulMap] = useState<Record<number, boolean>>({});
  const t = (en: string, ru: string) => (language === "ru" ? ru : en);
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold">{t("Verified Customer Reviews", "Verified Reviews")}</h3>
      {REVIEWS.map((r, i) => (
        <div key={i} className="bg-card border border-border rounded-2xl p-4 space-y-3">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <p className="font-bold">{r.name}</p>
                <span className="flex items-center gap-1 text-xs text-primary font-semibold"><BadgeCheck className="h-3.5 w-3.5" />{t("Verified Purchase", "Verified Buyer")}</span>
              </div>
              <p className="text-xs text-muted-foreground">{r.city} • {r.crop}</p>
            </div>
            <div className="flex">{Array.from({ length: 5 }).map((_, k) => <Star key={k} className={`h-4 w-4 ${k < r.rating ? "fill-primary text-primary" : "text-muted"}`} />)}</div>
          </div>
          <p className="text-sm text-foreground">{language === "ru" ? r.textUrdu : r.text}</p>
          {r.photos.length > 0 && (
            <div className="flex gap-2">{r.photos.map((p, k) => <img key={k} src={p} alt="review" className="w-20 h-20 object-cover rounded-lg" />)}</div>
          )}
          <button onClick={() => setHelpfulMap({ ...helpfulMap, [i]: !helpfulMap[i] })} className={`flex items-center gap-1.5 text-xs ${helpfulMap[i] ? "text-primary" : "text-muted-foreground"} hover:text-primary`}>
            <ThumbsUp className="h-3.5 w-3.5" />{t("Helpful", "Madadgar")} ({r.helpful + (helpfulMap[i] ? 1 : 0)})
          </button>
        </div>
      ))}
    </div>
  );
}

import { useEffect, useState } from "react";
import AccountLayout from "@/components/account/AccountLayout";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/contexts/LanguageContext";
import { getCropProfile, saveCropProfile, getRecommendedProducts } from "@/lib/personalization";
import { products } from "@/data/mockData";
import { toast } from "sonner";

const ALL_CROPS = Array.from(new Set(products.flatMap(p => p.targetCrops || []))).sort();

export default function AccountCropProfile() {
  const { language } = useLanguage();
  const t = (en: string, ru: string) => language === "ru" ? ru : en;
  const [crops, setCrops] = useState<string[]>([]);
  const [acreage, setAcreage] = useState(0);
  const [recs, setRecs] = useState(getRecommendedProducts(6));

  useEffect(() => { const p = getCropProfile(); setCrops(p.crops || []); setAcreage(p.acreage || 0); }, []);

  const toggle = (c: string) => setCrops(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c]);
  const save = () => { saveCropProfile({ crops, acreage }); setRecs(getRecommendedProducts(6)); toast.success(t("Profile saved", "Profile mehfooz")); };

  return (
    <AccountLayout title={t("Crop Profile", "Fasal Profile")}>
      <div className="premium-card p-5 mb-6 max-w-2xl">
        <p className="text-sm text-muted-foreground mb-4">{t("Tell us what you grow — we'll personalize your feed.", "Aap kya ugaate hain — hum aapka feed personalize kar denge.")}</p>
        <div className="space-y-2 mb-4">
          <Label>{t("Crops You Grow", "Aap Kya Ugaate Hain")}</Label>
          <div className="flex flex-wrap gap-2">
            {ALL_CROPS.map(c => (
              <button key={c} onClick={() => toggle(c)} className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-colors ${crops.includes(c) ? "bg-primary text-primary-foreground border-primary" : "bg-secondary border-border hover:border-primary"}`}>{c}</button>
            ))}
          </div>
        </div>
        <div className="space-y-2 mb-4 max-w-xs"><Label>{t("Total Acreage", "Kul Acres")}</Label><Input type="number" value={acreage} onChange={e => setAcreage(Number(e.target.value))} /></div>
        <Button variant="hero" onClick={save}>{t("Save & Personalize", "Mehfooz Aur Personalize")}</Button>
      </div>

      <h3 className="text-lg font-extrabold mb-3">{t("Recommended For Your Farm", "Aapke Farm Ke Liye")}</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {recs.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </AccountLayout>
  );
}

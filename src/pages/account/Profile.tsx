import { useState, useEffect } from "react";
import AccountLayout from "@/components/account/AccountLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";

export default function AccountProfile() {
  const { language, setLanguage } = useLanguage();
  const t = (en: string, ru: string) => language === "ru" ? ru : en;
  const [profile, setProfile] = useState({ name: "", phone: "", farmSize: "", primaryCrops: "" });

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("kc-profile") || "{}");
      setProfile(p => ({ ...p, ...saved, phone: localStorage.getItem("kc-user-phone") || saved.phone || "" }));
    } catch {}
  }, []);

  const save = () => {
    localStorage.setItem("kc-profile", JSON.stringify(profile));
    toast.success(t("Profile saved", "Profile mehfooz"));
  };

  return (
    <AccountLayout title={t("Profile", "Profile")}>
      <div className="premium-card p-6 space-y-4 max-w-xl">
        <div className="space-y-2"><Label>{t("Full Name", "Poora Naam")}</Label><Input value={profile.name} onChange={e => setProfile({ ...profile, name: e.target.value })} maxLength={100} /></div>
        <div className="space-y-2"><Label>{t("Phone", "Phone")}</Label><Input value={profile.phone} disabled /></div>
        <div className="space-y-2"><Label>{t("Farm Size (acres)", "Khet Ka Size (acres)")}</Label><Input type="number" value={profile.farmSize} onChange={e => setProfile({ ...profile, farmSize: e.target.value })} /></div>
        <div className="space-y-2"><Label>{t("Primary Crops", "Aam Fasalain")}</Label><Input placeholder="Wheat, Rice, Cotton" value={profile.primaryCrops} onChange={e => setProfile({ ...profile, primaryCrops: e.target.value })} maxLength={200} /></div>
        <div className="space-y-2">
          <Label>{t("Language", "Zubaan")}</Label>
          <div className="flex gap-2">
            <Button variant={language === "en" ? "default" : "outline"} size="sm" onClick={() => setLanguage("en")}>English</Button>
            <Button variant={language === "ru" ? "default" : "outline"} size="sm" onClick={() => setLanguage("ru")}>Roman Urdu</Button>
          </div>
        </div>
        <Button variant="hero" onClick={save}>{t("Save Changes", "Mehfooz Karein")}</Button>
      </div>
    </AccountLayout>
  );
}

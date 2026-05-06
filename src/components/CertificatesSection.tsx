import { ShieldCheck, FileText, Download } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";

export default function CertificatesSection({ brand }: { brand: string }) {
  const { language } = useLanguage();
  const t = (en: string, ru: string) => (language === "ru" ? ru : en);
  return (
    <div className="bg-gradient-to-br from-primary/5 to-card border border-primary/20 rounded-2xl p-5 space-y-3">
      <h3 className="font-bold flex items-center gap-2 text-foreground"><ShieldCheck className="h-5 w-5 text-primary" />{t("Authenticity & Certifications", "Asliyat aur Certificates")}</h3>
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="flex items-center gap-2 p-2 bg-card rounded-lg border border-border"><FileText className="h-4 w-4 text-primary" /><span>{t("DPP Registered", "DPP Registered")}</span></div>
        <div className="flex items-center gap-2 p-2 bg-card rounded-lg border border-border"><FileText className="h-4 w-4 text-primary" /><span>{t("Batch Lab Tested", "Batch Lab Tested")}</span></div>
        <div className="flex items-center gap-2 p-2 bg-card rounded-lg border border-border"><FileText className="h-4 w-4 text-primary" /><span>{t("Authorised Distributor", "Authorised")}</span></div>
        <div className="flex items-center gap-2 p-2 bg-card rounded-lg border border-border"><FileText className="h-4 w-4 text-primary" /><span>{t("Expiry Verified", "Expiry Verified")}</span></div>
      </div>
      <Button variant="outline" size="sm" className="w-full"><Download className="h-3.5 w-3.5" />{t(`Download ${brand} Lab Certificate (PDF)`, `${brand} ka Lab Certificate Download`)}</Button>
    </div>
  );
}

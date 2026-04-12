import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
import WhatsAppFAB from "@/components/WhatsAppFAB";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Tag, Copy, CheckCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const coupons = [
  { code: "KISSAN10", discountEn: "10% Off First Order", discountRu: "Pehle Order Par 10% Off", minOrder: 500, expiryEn: "Valid till June 2026", expiryRu: "June 2026 tak", color: "from-primary to-trust-green" },
  { code: "FREEDELIVERY", discountEn: "Free Delivery on Rs.2000+", discountRu: "Rs.2000+ Par Muft Delivery", minOrder: 2000, expiryEn: "Valid till May 2026", expiryRu: "May 2026 tak", color: "from-accent to-agri-gold" },
  { code: "KHARIF25", discountEn: "15% Off All Seeds", discountRu: "Tamam Beejon Par 15% Off", minOrder: 1000, expiryEn: "Kharif Season Only", expiryRu: "Sirf Kharif Season", color: "from-primary to-agri-mid" },
  { code: "SPRAY500", discountEn: "Rs.500 Off Pesticides", discountRu: "Pesticides Par Rs.500 Off", minOrder: 3000, expiryEn: "Valid till July 2026", expiryRu: "July 2026 tak", color: "from-trust-green to-primary" },
];

export default function Coupons() {
  const { language, t } = useLanguage();
  const [copied, setCopied] = useState<string | null>(null);

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(code);
    toast.success(language === "ru" ? `${code} copy ho gaya!` : `${code} copied!`);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead title="Coupons & Deals - Kissan Cares" description="Get discount coupons for agricultural products. Save on seeds, pesticides, and fertilizers." canonical="https://kissancares.com/coupons" />
      <Header />
      <main className="flex-1 pb-20 lg:pb-0">
        <Breadcrumbs items={[{ label: t("nav.home"), to: "/" }, { label: language === "ru" ? "Coupon Codes" : "Coupons" }]} />

        <div className="container py-10">
          <div className="text-center mb-10">
            <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
              <Tag className="h-7 w-7 text-accent" />
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-foreground mb-2">
              {language === "ru" ? "Discount Coupon Codes" : "Coupon Codes & Deals"}
            </h1>
            <p className="text-muted-foreground text-sm">
              {language === "ru" ? "In codes ko checkout par istemal karein aur bachat karein!" : "Use these codes at checkout and save!"}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-5 max-w-3xl mx-auto">
            {coupons.map(coupon => (
              <div key={coupon.code} className="premium-card overflow-hidden">
                <div className={`bg-gradient-to-r ${coupon.color} p-5 text-primary-foreground`}>
                  <p className="text-lg font-extrabold">{language === "ru" ? coupon.discountRu : coupon.discountEn}</p>
                  <p className="text-xs opacity-80 mt-1">
                    {language === "ru" ? `Kam az kam order: Rs.${coupon.minOrder}` : `Min order: Rs.${coupon.minOrder}`}
                  </p>
                </div>
                <div className="p-4 flex items-center justify-between">
                  <div>
                    <p className="font-extrabold text-foreground tracking-wider text-lg">{coupon.code}</p>
                    <p className="text-[11px] text-muted-foreground">{language === "ru" ? coupon.expiryRu : coupon.expiryEn}</p>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => copyCode(coupon.code)} className="gap-1.5">
                    {copied === coupon.code ? <CheckCircle className="h-4 w-4 text-trust-green" /> : <Copy className="h-4 w-4" />}
                    {copied === coupon.code ? (language === "ru" ? "Ho Gaya" : "Copied") : (language === "ru" ? "Copy" : "Copy")}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppFAB />
      <BottomNav />
    </div>
  );
}

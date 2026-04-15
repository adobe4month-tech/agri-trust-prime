import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
import WhatsAppFAB from "@/components/WhatsAppFAB";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";
import { useLanguage } from "@/contexts/LanguageContext";
import { products } from "@/data/mockData";
import { ShieldCheck, Package, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useMemo } from "react";

const allBrands = [
  "Saver Enterprise", "LCI (Lucky Core Industries)", "BAYER", "FMC Pakistan",
  "ENGRO", "Syngenta", "FFC", "Evyol Group", "Rachna Agri Business",
  "Sohni Dharti Seeds", "Kalash Seeds", "Millan Agro Seed",
  "Ali Akbar Group", "Arysta LifeScience", "Kanzo AG", "Tara Group",
  "Four Brothers", "Jaffer Agro Services", "Guard Agricultural",
  "Auriga Chemical", "Crop Life Sciences", "United Distributors",
  "Crop Master", "Agri Tech", "Green Valley Seeds", "Punjab Seed Corporation",
  "National Fertilizer", "Pakistan Seeds", "Zahoor Elahi Seeds",
  "Bio Power", "Naya Daur Agri", "Qamar Agri", "Star Crop Sciences",
  "Hara Patta Seeds", "Excel Crop Care",
];

const brandColors: Record<string, string> = {
  S: "bg-primary/10 text-primary", L: "bg-accent/10 text-accent", B: "bg-sale/10 text-sale",
  F: "bg-trust-green/10 text-trust-green", E: "bg-agri-gold/10 text-agri-gold",
};

export default function Brands() {
  const { language, t } = useLanguage();

  const brandCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    products.forEach(p => { counts[p.brand] = (counts[p.brand] || 0) + 1; });
    return counts;
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead title="All Brands - Kissan Cares" description="Browse 35+ trusted agricultural brands available on KissanCares." canonical="https://kissancares.com/brands" />
      <Header />
      <main className="flex-1 pb-20 lg:pb-0">
        <Breadcrumbs items={[{ label: t("nav.home"), to: "/" }, { label: language === "ru" ? "Tamam Brands" : "All Brands" }]} />
        <div className="container py-10">
          <div className="text-center mb-10">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="h-7 w-7 text-primary" />
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-foreground mb-2">
              {language === "ru" ? "Hamari Bharosemand Brands" : "Our Trusted Brands"}
            </h1>
            <p className="text-muted-foreground text-sm">
              {language === "ru" ? "35+ top manufacturers ke 100% asli products" : "100% authentic products from 35+ top manufacturers"}
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {allBrands.map(brand => {
              const initial = brand.charAt(0);
              const colorClass = brandColors[initial] || "bg-secondary text-foreground";
              const count = brandCounts[brand] || 0;
              return (
                <Link key={brand} to={`/products?brand=${encodeURIComponent(brand)}`} className="premium-card p-5 text-center hover:border-primary/30 transition-all group">
                  <div className={`w-12 h-12 rounded-xl ${colorClass} flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                    <span className="font-extrabold text-lg">{initial}</span>
                  </div>
                  <p className="text-xs font-bold text-foreground leading-tight mb-1">{brand}</p>
                  {count > 0 && (
                    <p className="text-[10px] text-muted-foreground flex items-center justify-center gap-1">
                      <Package className="h-2.5 w-2.5" /> {count} products
                    </p>
                  )}
                  <div className="mt-2 flex items-center justify-center gap-1 text-primary/0 group-hover:text-primary text-[10px] font-semibold transition-colors">
                    {language === "ru" ? "Products Dekhein" : "View Products"} <ArrowRight className="h-3 w-3" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppFAB />
      <BottomNav />
    </div>
  );
}

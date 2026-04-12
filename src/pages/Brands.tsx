import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
import WhatsAppFAB from "@/components/WhatsAppFAB";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";
import { useLanguage } from "@/contexts/LanguageContext";
import { ShieldCheck } from "lucide-react";

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

export default function Brands() {
  const { language, t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead title="All Brands - Kissan Cares" description="Browse 35+ trusted agricultural brands available on KissanCares. Authentic products from top manufacturers." canonical="https://kissancares.com/brands" />
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
            {allBrands.map(brand => (
              <a
                key={brand}
                href={`https://kissancares.com/products?company=${encodeURIComponent(brand)}`}
                className="premium-card p-5 text-center hover:border-primary/30 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/10 transition-colors">
                  <span className="text-primary font-extrabold text-lg">{brand.charAt(0)}</span>
                </div>
                <p className="text-xs font-bold text-foreground leading-tight">{brand}</p>
              </a>
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

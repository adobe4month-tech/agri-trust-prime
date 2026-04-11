import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
import WhatsAppFAB from "@/components/WhatsAppFAB";
import SEOHead from "@/components/SEOHead";
import ProductCard from "@/components/ProductCard";
import { useLanguage } from "@/contexts/LanguageContext";
import { products } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Home, Search, MessageCircle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const { language, t } = useLanguage();
  const popularProducts = products.slice(0, 4);

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead title="Page Not Found" description="The page you're looking for doesn't exist." />
      <Header />

      <main className="flex-1 pb-20 lg:pb-0">
        <div className="container py-16 text-center">
          <div className="max-w-md mx-auto">
            <h1 className="text-7xl font-extrabold text-primary/20 mb-4">404</h1>
            <h2 className="text-xl font-extrabold text-foreground mb-2">{t("404.title")}</h2>
            <p className="text-sm text-muted-foreground mb-6">{t("404.subtitle")}</p>

            {/* Search */}
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={language === "ru" ? "Products talaash karein..." : "Search products..."}
                className="pl-11 h-11 bg-secondary/60 border border-border rounded-xl text-sm"
              />
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 justify-center">
              <Button asChild variant="default" size="lg">
                <Link to="/"><Home className="h-4 w-4" /> {t("404.home")}</Link>
              </Button>
              <Button asChild variant="whatsapp" size="default">
                <a href="https://wa.me/923240287276" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-4 w-4" /> WhatsApp
                </a>
              </Button>
            </div>
          </div>

          {/* Popular products */}
          <div className="mt-12">
            <h3 className="text-lg font-extrabold text-foreground mb-4">{t("404.popular")}</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto">
              {popularProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppFAB />
      <BottomNav />
    </div>
  );
};

export default NotFound;

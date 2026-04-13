import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import Footer from "@/components/Footer";
import WhatsAppFAB from "@/components/WhatsAppFAB";
import HeroSection from "@/components/home/HeroSection";
import TrustBar from "@/components/home/TrustBar";
import ShopByCrop from "@/components/home/ShopByCrop";
import ShopByProblem from "@/components/home/ShopByProblem";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import FeaturedReviews from "@/components/home/FeaturedReviews";
import BrandCarousel from "@/components/home/BrandCarousel";
import SocialProofTicker from "@/components/SocialProofTicker";
import SeasonalCalendar from "@/components/home/SeasonalCalendar";
import SEOHead from "@/components/SEOHead";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { products } from "@/data/mockData";
import ProductCard from "@/components/ProductCard";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Tag, X, Clock, Sparkles, Heart, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

function UrgencyBanner() {
  const [dismissed, setDismissed] = useState(false);
  const { language } = useLanguage();

  if (dismissed) return null;

  return (
    <div className="bg-gradient-to-r from-sale to-accent text-primary-foreground relative overflow-hidden">
      <div className="absolute inset-0 shimmer pointer-events-none" />
      <div className="container py-2 flex items-center justify-center gap-3 relative">
        <Tag className="h-3.5 w-3.5 shrink-0" />
        <p className="text-[11px] md:text-xs font-bold text-center">
          {language === "ru"
            ? "🔥 Aaj Ki Deal: Spectar 20EC — Sirf Rs.1,450! Code: KISSAN10"
            : "🔥 Today's Deal: Spectar 20EC — Only Rs.1,450! Code: KISSAN10"}
        </p>
        <button onClick={() => setDismissed(true)} className="absolute right-4 text-primary-foreground/60 hover:text-primary-foreground">
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

function RecentlyViewed() {
  const { language, t } = useLanguage();
  const { addToCart } = useCart();
  const [recentIds, setRecentIds] = useState<number[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("kc-recent");
      if (stored) setRecentIds(JSON.parse(stored));
    } catch {}
  }, []);

  const recentProducts = products.filter(p => recentIds.includes(p.id));
  if (recentProducts.length === 0) return null;

  const handleReorder = (product: typeof products[0]) => {
    addToCart(product);
    toast.success(language === "ru" ? `${product.nameUrdu} cart mein daal diya!` : `${product.name} added to cart!`);
  };

  return (
    <section className="py-8">
      <div className="container">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Clock className="h-4 w-4 text-primary" />
          </div>
          <h2 className="text-lg font-extrabold text-foreground">{t("recent.title")}</h2>
        </div>
        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
          {recentProducts.map(p => (
            <div key={p.id} className="shrink-0 w-44">
              <ProductCard product={p} />
              <Button
                variant="outline"
                size="sm"
                className="w-full mt-1 text-[10px] h-7"
                onClick={() => handleReorder(p)}
              >
                <RotateCcw className="h-3 w-3" />
                {language === "ru" ? "Dobara Order" : "Reorder"}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WishlistSection() {
  const { language } = useLanguage();
  const { wishlistIds } = useWishlist();
  const wishlistProducts = products.filter(p => wishlistIds.includes(p.id));

  if (wishlistProducts.length === 0) return null;

  return (
    <section className="py-8">
      <div className="container">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-lg bg-sale/10 flex items-center justify-center">
            <Heart className="h-4 w-4 text-sale" />
          </div>
          <h2 className="text-lg font-extrabold text-foreground">
            {language === "ru" ? "Aapki Pasand" : "Your Wishlist"}
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {wishlistProducts.slice(0, 4).map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

function JustForYou() {
  const { language } = useLanguage();
  const picks = products.slice(0, 4);

  return (
    <section className="py-8">
      <div className="container">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
            <Sparkles className="h-4 w-4 text-accent" />
          </div>
          <h2 className="text-lg font-extrabold text-foreground">
            {language === "ru" ? "Aapke Liye Khaas" : "Just For You"}
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {picks.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title="Buy Agricultural Products Online in Pakistan"
        description="Pakistan's trusted online agricultural store. Buy original seeds, pesticides, herbicides & fertilizers. Cash on Delivery. 12,500+ farmers trust us."
        canonical="https://kissancares.com"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Kissan Cares",
          url: "https://kissancares.com",
          description: "Pakistan's trusted online agricultural store",
          contactPoint: { "@type": "ContactPoint", telephone: "+923240287276", contactType: "customer service" },
        }}
      />
      <UrgencyBanner />
      <Header />
      <main className="flex-1">
        <HeroSection />
        <FeaturedProducts title="Weekly Sale" icon="flame" />
        <SeasonalCalendar />
        <ShopByCrop />
        <ShopByProblem />
        <FeaturedProducts title="Latest Products" filter={(p) => p.category === "seed"} icon="sparkles" />
        <FeaturedReviews />
        <WishlistSection />
        <RecentlyViewed />
        <JustForYou />
        <TrustBar />
        <BrandCarousel />
      </main>
      <Footer />
      <WhatsAppFAB />
      <SocialProofTicker />
      <BottomNav />
    </div>
  );
};

export default Index;

import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { useWishlist } from "@/contexts/WishlistContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { products } from "@/data/mockData";
import ProductCard from "@/components/ProductCard";
import { Heart } from "lucide-react";

export default function Wishlist() {
  const { wishlistIds, clearWishlist } = useWishlist();
  const { language } = useLanguage();
  const t = (en: string, ru: string) => (language === "ru" ? ru : en);
  const items = products.filter(p => wishlistIds.includes(p.id));

  return (
    <div className="min-h-screen bg-background">
      <SEOHead title="Wishlist — KissanCares" description="Your saved products." />
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl md:text-3xl font-extrabold">{t("Wishlist", "Pasandeeda")} ({items.length})</h1>
          {items.length > 0 && <Button variant="ghost" size="sm" onClick={clearWishlist} className="text-destructive">{t("Clear All", "Saaf Karein")}</Button>}
        </div>
        {items.length === 0 ? (
          <div className="text-center py-20">
            <Heart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground mb-6">{t("No saved items yet", "Koi product save nahi")}</p>
            <Button asChild variant="hero"><Link to="/products">{t("Browse Products", "Products Dekhein")}</Link></Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {items.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

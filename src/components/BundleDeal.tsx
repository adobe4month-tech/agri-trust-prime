import { products, type Product } from "@/data/mockData";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Plus, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const bundleMap: Record<string, number[]> = {
  "pesticide": [301, 302],
  "herbicide": [305, 303],
  "seed": [308, 315],
};

export default function BundleDeal({ currentProduct }: { currentProduct: Product }) {
  const { language } = useLanguage();
  const { addToCart } = useCart();

  const bundleIds = bundleMap[currentProduct.category] || [];
  const bundleProducts = products.filter(p => bundleIds.includes(p.id) && p.id !== currentProduct.id).slice(0, 2);

  if (bundleProducts.length === 0) return null;

  const bundleTotal = bundleProducts.reduce((sum, p) => sum + p.price, 0) + currentProduct.price;
  const savings = Math.round(bundleTotal * 0.08);
  const bundlePrice = bundleTotal - savings;

  const handleBundleAdd = () => {
    addToCart(currentProduct);
    bundleProducts.forEach(p => addToCart(p));
    toast.success(language === "ru" ? "Bundle cart mein daal diya!" : "Bundle added to cart!");
  };

  return (
    <div className="premium-card p-5 bg-accent/5 border-accent/15">
      <h3 className="text-sm font-extrabold text-foreground mb-3 flex items-center gap-2">
        🎁 {language === "ru" ? "Yeh Saath Mein Khareedein — Bachaayein!" : "Frequently Bought Together — Save!"}
      </h3>
      <div className="flex items-center gap-2 flex-wrap mb-4">
        <Link to={`/product/${currentProduct.slug}`} className="shrink-0">
          <div className="w-16 h-16 rounded-lg border border-border/50 overflow-hidden bg-secondary/30">
            <img src={currentProduct.image} alt={currentProduct.name} className="w-full h-full object-contain p-1" />
          </div>
        </Link>
        {bundleProducts.map(p => (
          <div key={p.id} className="flex items-center gap-2">
            <Plus className="h-4 w-4 text-muted-foreground shrink-0" />
            <Link to={`/product/${p.slug}`}>
              <div className="w-16 h-16 rounded-lg border border-border/50 overflow-hidden bg-secondary/30">
                <img src={p.image} alt={p.name} className="w-full h-full object-contain p-1" />
              </div>
            </Link>
          </div>
        ))}
        <ArrowRight className="h-4 w-4 text-muted-foreground mx-1" />
        <div className="text-right">
          <p className="text-xs text-muted-foreground line-through">Rs.{bundleTotal.toLocaleString()}</p>
          <p className="text-lg font-extrabold text-foreground">Rs.{bundlePrice.toLocaleString()}</p>
          <p className="text-[10px] font-bold text-accent">Save Rs.{savings.toLocaleString()}</p>
        </div>
      </div>
      <Button variant="hero" size="sm" className="w-full text-xs" onClick={handleBundleAdd}>
        <ShoppingCart className="h-3.5 w-3.5" /> {language === "ru" ? "Sab Cart Mein Daalein" : "Add All to Cart"}
      </Button>
    </div>
  );
}

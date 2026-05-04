import { Link } from "react-router-dom";
import { Star, Truck, ShoppingCart, Flame, Heart, GitCompareArrows, MessageCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { useCompare } from "@/components/ProductCompare";
import GuaranteeBadge from "@/components/GuaranteeBadge";
import type { Product } from "@/data/mockData";
import { toast } from "sonner";

export default function ProductCard({ product }: { product: Product }) {
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  const { language, t } = useLanguage();
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const { toggleCompare, isComparing } = useCompare();
  const name = language === "ru" ? product.nameUrdu : product.name;
  const wishlisted = isWishlisted(product.id);
  const comparing = isComparing(product.id);
  const isSoldOut = product.stockStatus === "sold-out";
  const isComingSoon = product.stockStatus === "coming-soon";
  const isUnavailable = isSoldOut || isComingSoon;
  const notifyHref = `https://wa.me/923240287276?text=${encodeURIComponent(
    language === "ru"
      ? `Salaam! Mujhe ${product.nameUrdu} stock mein aane par WhatsApp par batayein.`
      : `Hello! Please notify me when ${product.name} is back in stock.`
  )}`;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    toast.success(language === "ru" ? `${product.nameUrdu} cart mein daal diya!` : `${product.name} added to cart!`);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
    toast.success(wishlisted
      ? (language === "ru" ? "Pasand se hataya" : "Removed from wishlist")
      : (language === "ru" ? "Pasand mein daala!" : "Added to wishlist!")
    );
  };

  const handleCompare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleCompare(product.id);
  };

  return (
    <div className="premium-card group block">
      <Link to={`/product/${product.slug}`}>
        <div className="relative aspect-square overflow-hidden bg-secondary/50">
          <img src={product.image} alt={name} loading="lazy" className="w-full h-full object-contain p-4 transition-transform duration-500 ease-out group-hover:scale-110" />
          {product.onSale && discount > 0 && (
            <span className="absolute top-2.5 left-2.5 bg-sale text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded-md">-{discount}%</span>
          )}
          {product.freeDelivery && (
            <span className="absolute top-2.5 right-2.5 bg-primary text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-0.5">
              <Truck className="h-3 w-3" /> {t("product.free")}
            </span>
          )}
          {isUnavailable && (
            <div className="absolute inset-0 bg-background/70 backdrop-blur-[1px] flex items-center justify-center">
              <span className={`text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-md ${isSoldOut ? "bg-sale text-primary-foreground" : "bg-agri-gold text-foreground"}`}>
                {isSoldOut
                  ? (language === "ru" ? "Stock Khatam" : "Sold Out")
                  : (language === "ru" ? "Jald Aaraha" : "Coming Soon")}
              </span>
            </div>
          )}
          {/* Wishlist + Compare buttons */}
          <div className="absolute bottom-2 right-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button onClick={handleWishlist} className={`w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-colors ${wishlisted ? "bg-sale text-primary-foreground" : "bg-card/90 text-muted-foreground hover:text-sale"}`}>
              <Heart className={`h-4 w-4 ${wishlisted ? "fill-current" : ""}`} />
            </button>
            <button onClick={handleCompare} className={`w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-colors ${comparing ? "bg-primary text-primary-foreground" : "bg-card/90 text-muted-foreground hover:text-primary"}`}>
              <GitCompareArrows className="h-4 w-4" />
            </button>
          </div>
        </div>
        <div className="p-3.5">
          <div className="flex items-center gap-1.5 mb-1">
            <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">{product.brand}</p>
            <GuaranteeBadge variant="compact" />
          </div>
          <h3 className="text-sm font-bold text-foreground leading-snug line-clamp-2 mb-2 group-hover:text-primary transition-colors duration-200">{name}</h3>
          <div className="flex items-center gap-2 mb-2.5">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`h-3 w-3 ${i < Math.floor(product.rating) ? "fill-agri-gold text-agri-gold" : "fill-muted text-muted"}`} />
              ))}
            </div>
            <span className="text-xs font-semibold text-foreground">{product.rating}</span>
            <span className="text-[10px] text-muted-foreground">({product.reviewCount})</span>
          </div>
          {product.soldCount > 0 && (
            <div className="sold-badge mb-2.5">
              <Flame className="h-3 w-3" />
              <span>{product.soldCount.toLocaleString()} {t("product.sold")}</span>
            </div>
          )}
          <div className="flex items-baseline gap-2">
            <span className="text-base font-extrabold text-foreground">Rs.{product.price.toLocaleString()}</span>
            {product.originalPrice > product.price && (
              <span className="text-[11px] text-muted-foreground line-through">Rs.{product.originalPrice.toLocaleString()}</span>
            )}
          </div>
        </div>
      </Link>
      <div className="px-3.5 pb-3.5">
        {isUnavailable ? (
          <Button asChild variant="whatsapp" size="sm" className="w-full text-xs" onClick={(e) => e.stopPropagation()}>
            <a href={notifyHref} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-3.5 w-3.5" />
              {language === "ru" ? "Notify Karein" : "Notify Me"}
            </a>
          </Button>
        ) : (
          <Button variant="default" size="sm" className="w-full text-xs" onClick={handleAddToCart}>
            <ShoppingCart className="h-3.5 w-3.5" /> {t("product.addToCart")}
          </Button>
        )}
      </div>
    </div>
  );
}

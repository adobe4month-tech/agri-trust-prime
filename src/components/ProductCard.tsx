import { Link } from "react-router-dom";
import { Star, Truck, ShoppingCart, Flame } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Product } from "@/data/mockData";

export default function ProductCard({ product }: { product: Product }) {
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <div className="premium-card group block">
      <Link to={`/product/${product.slug}`}>
        {/* Image area */}
        <div className="relative aspect-square overflow-hidden bg-secondary/50">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-contain p-4 transition-transform duration-500 ease-out group-hover:scale-110"
          />

          {/* Sale badge */}
          {product.onSale && discount > 0 && (
            <span className="absolute top-2.5 left-2.5 bg-sale text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded-md">
              -{discount}%
            </span>
          )}

          {/* Free delivery badge */}
          {product.freeDelivery && (
            <span className="absolute top-2.5 right-2.5 bg-primary text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-0.5">
              <Truck className="h-3 w-3" /> Free
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-3.5">
          <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider mb-1">{product.brand}</p>
          <h3 className="text-sm font-bold text-foreground leading-snug line-clamp-2 mb-2 group-hover:text-primary transition-colors duration-200">
            {product.name}
          </h3>

          {/* Rating + Sold */}
          <div className="flex items-center gap-2 mb-2.5">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`h-3 w-3 ${i < Math.floor(product.rating) ? "fill-agri-gold text-agri-gold" : "fill-muted text-muted"}`} />
              ))}
            </div>
            <span className="text-xs font-semibold text-foreground">{product.rating}</span>
            <span className="text-[10px] text-muted-foreground">({product.reviewCount})</span>
          </div>

          {/* Sold count — key trust signal */}
          {product.soldCount > 0 && (
            <div className="sold-badge mb-2.5">
              <Flame className="h-3 w-3" />
              <span>{product.soldCount.toLocaleString()} Sold</span>
            </div>
          )}

          {/* Price */}
          <div className="flex items-baseline gap-2">
            <span className="text-base font-extrabold text-foreground">Rs.{product.price.toLocaleString()}</span>
            {product.originalPrice > product.price && (
              <span className="text-[11px] text-muted-foreground line-through">Rs.{product.originalPrice.toLocaleString()}</span>
            )}
          </div>
        </div>
      </Link>

      {/* Quick Add to Cart */}
      <div className="px-3.5 pb-3.5">
        <Button
          variant="default"
          size="sm"
          className="w-full opacity-0 group-hover:opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-200 text-xs"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <ShoppingCart className="h-3.5 w-3.5" /> Add to Cart
        </Button>
        {/* Always visible on mobile */}
        <Button
          variant="default"
          size="sm"
          className="w-full lg:hidden text-xs mt-0 lg:mt-0"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          style={{ display: 'none' }}
        >
          <ShoppingCart className="h-3.5 w-3.5" /> Add to Cart
        </Button>
      </div>
    </div>
  );
}

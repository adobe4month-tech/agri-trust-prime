import { Link } from "react-router-dom";
import { Star, Truck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@/data/mockData";

export default function ProductCard({ product }: { product: Product }) {
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <Link to={`/product/${product.slug}`} className="premium-card group block">
      {/* Image area */}
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-secondary to-muted">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-contain p-4 transition-transform duration-500 ease-out group-hover:scale-110"
        />

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Sale badge */}
        {product.onSale && discount > 0 && (
          <span className="absolute top-3 left-3 bg-sale text-white text-[10px] font-bold px-2.5 py-1 rounded-lg shadow-lg">
            -{discount}%
          </span>
        )}

        {/* Free delivery badge */}
        {product.freeDelivery && (
          <span className="absolute top-3 right-3 bg-primary text-primary-foreground text-[10px] font-bold px-2.5 py-1 rounded-lg shadow-lg flex items-center gap-1">
            <Truck className="h-3 w-3" /> Free
          </span>
        )}

        {/* Quick view shimmer on hover */}
        <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-primary via-agri-gold to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-[11px] text-muted-foreground font-medium uppercase tracking-wider mb-1.5">{product.brand}</p>
        <h3 className="text-sm font-bold text-foreground leading-snug line-clamp-2 mb-2.5 group-hover:text-primary transition-colors duration-300">
          {product.name}
        </h3>

        {/* Rating with gold stars */}
        <div className="flex items-center gap-1.5 mb-3">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`h-3.5 w-3.5 ${i < Math.floor(product.rating) ? "fill-agri-gold text-agri-gold" : "fill-muted text-muted"}`} />
            ))}
          </div>
          <span className="text-xs font-semibold text-foreground">{product.rating}</span>
          <span className="text-[10px] text-muted-foreground">({product.reviewCount})</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2.5">
          <span className="text-lg font-extrabold text-foreground">Rs.{product.price.toLocaleString()}</span>
          {product.originalPrice > product.price && (
            <span className="text-xs text-muted-foreground line-through">Rs.{product.originalPrice.toLocaleString()}</span>
          )}
        </div>

        {/* Credibility badges */}
        {product.badges.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {product.badges.slice(0, 2).map(b => (
              <Badge
                key={b}
                variant="secondary"
                className="text-[9px] px-2 py-0.5 h-auto bg-primary/5 text-primary border border-primary/10 font-semibold"
              >
                ✓ {b}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}

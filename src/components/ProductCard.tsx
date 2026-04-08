import { Link } from "react-router-dom";
import { Star, Truck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@/data/mockData";

export default function ProductCard({ product }: { product: Product }) {
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <Link
      to={`/product/${product.slug}`}
      className="group block bg-card rounded-lg overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300"
    >
      {/* Image */}
      <div className="relative aspect-square bg-secondary overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-300"
        />
        {product.onSale && discount > 0 && (
          <span className="absolute top-2 left-2 bg-sale text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded-full">
            -{discount}%
          </span>
        )}
        {product.freeDelivery && (
          <span className="absolute top-2 right-2 bg-primary text-primary-foreground text-[10px] font-medium px-2 py-0.5 rounded-full flex items-center gap-1">
            <Truck className="h-3 w-3" /> Free
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-3">
        <p className="text-[11px] text-muted-foreground mb-1">{product.brand}</p>
        <h3 className="text-sm font-semibold text-foreground leading-tight line-clamp-2 mb-2 group-hover:text-primary transition-colors">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <Star className="h-3.5 w-3.5 fill-agri-gold text-agri-gold" />
          <span className="text-xs font-medium text-foreground">{product.rating}</span>
          <span className="text-[10px] text-muted-foreground">({product.reviewCount})</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2">
          <span className="text-base font-bold text-foreground">Rs.{product.price.toLocaleString()}</span>
          {product.originalPrice > product.price && (
            <span className="text-xs text-muted-foreground line-through">Rs.{product.originalPrice.toLocaleString()}</span>
          )}
        </div>

        {/* Badges */}
        {product.badges.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {product.badges.slice(0, 2).map(b => (
              <Badge key={b} variant="secondary" className="text-[9px] px-1.5 py-0 h-4 bg-secondary text-secondary-foreground">
                ✓ {b}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}

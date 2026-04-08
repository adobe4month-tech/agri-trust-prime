import { products } from "@/data/mockData";
import ProductCard from "@/components/ProductCard";
import { Link } from "react-router-dom";
import { ArrowRight, Flame, Sparkles } from "lucide-react";
import { useScrollReveal } from "@/hooks/useAnimations";

export default function FeaturedProducts({
  title = "Weekly Sale",
  filter,
  icon = "flame",
}: {
  title?: string;
  filter?: (p: (typeof products)[0]) => boolean;
  icon?: "flame" | "sparkles";
}) {
  const filtered = filter ? products.filter(filter) : products;
  const shown = filtered.slice(0, 8);
  const ref = useScrollReveal();

  const Icon = icon === "flame" ? Flame : Sparkles;

  return (
    <section className="py-14 md:py-20">
      <div ref={ref} className="container reveal-section">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent/20 to-agri-gold/20 flex items-center justify-center">
              <Icon className="h-5 w-5 text-accent" />
            </div>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-extrabold text-foreground">{title}</h2>
          </div>
          <Link
            to="/products"
            className="group flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
          >
            View All <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 stagger-children revealed">
          {shown.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

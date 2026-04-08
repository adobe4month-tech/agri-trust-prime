import { products } from "@/data/mockData";
import ProductCard from "@/components/ProductCard";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function FeaturedProducts({ title = "Weekly Sale", filter }: { title?: string; filter?: (p: typeof products[0]) => boolean }) {
  const filtered = filter ? products.filter(filter) : products;
  const shown = filtered.slice(0, 8);

  return (
    <section className="container py-10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-foreground">{title}</h2>
        <Link to="/products" className="text-sm font-medium text-primary flex items-center gap-1 hover:underline">
          View All <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
        {shown.map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}

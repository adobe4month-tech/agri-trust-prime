import { Link } from "react-router-dom";
import { problemCategories } from "@/data/mockData";
import { useScrollReveal } from "@/hooks/useAnimations";
import { ArrowRight } from "lucide-react";

export default function ShopByProblem() {
  const ref = useScrollReveal();

  return (
    <section className="py-14 md:py-20 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/30 to-background" />

      <div ref={ref} className="container reveal-section relative">
        <div className="text-center mb-10">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent/60 mb-2">Find Solutions</p>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-foreground">
            Shop by <span className="text-gradient-gold">Problem</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 stagger-children revealed">
          {problemCategories.map(cat => (
            <Link
              key={cat.slug}
              to={`/products?problem=${cat.slug}`}
              className="group premium-card text-center p-5 md:p-6 cursor-pointer"
            >
              <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-500">
                {cat.icon}
              </div>
              <p className="text-sm font-bold text-foreground mb-1 group-hover:text-primary transition-colors">{cat.name}</p>
              <p className="text-xs text-muted-foreground font-medium">{cat.count} products</p>
              <div className="mt-3 flex items-center justify-center gap-1 text-primary/0 group-hover:text-primary/80 transition-all duration-300 text-xs font-semibold">
                Explore <ArrowRight className="h-3 w-3" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

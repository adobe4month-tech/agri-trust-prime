import { Link } from "react-router-dom";
import { problemCategories } from "@/data/mockData";
import { useScrollReveal } from "@/hooks/useAnimations";
import { ArrowRight, Leaf, Bug, ShieldAlert, Droplets, Sprout, TrendingUp } from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  weed: Leaf,
  pest: Bug,
  disease: ShieldAlert,
  nutrition: Droplets,
  seed: Sprout,
  growth: TrendingUp,
};

export default function ShopByProblem() {
  const ref = useScrollReveal();

  return (
    <section className="py-12 md:py-16 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/30 to-background" />

      <div ref={ref} className="container reveal-section relative">
        <div className="text-center mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent/60 mb-2">Find Solutions</p>
          <h2 className="text-2xl md:text-3xl font-extrabold text-foreground">
            Shop by <span className="text-gradient-gold">Problem</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 stagger-children revealed">
          {problemCategories.map(cat => {
            const Icon = iconMap[cat.icon] || Leaf;
            return (
              <Link
                key={cat.slug}
                to={`/products?problem=${cat.slug}`}
                className="group premium-card text-center p-5 cursor-pointer"
              >
                <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <p className="text-sm font-bold text-foreground mb-0.5 group-hover:text-primary transition-colors">{cat.name}</p>
                <p className="text-[10px] text-muted-foreground/60 mb-1" dir="rtl">{cat.nameUrdu}</p>
                <p className="text-[10px] text-muted-foreground font-medium">{cat.count} products</p>
                <div className="mt-2 flex items-center justify-center gap-1 text-primary/0 group-hover:text-primary/80 transition-all duration-200 text-[10px] font-semibold">
                  Explore <ArrowRight className="h-3 w-3" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

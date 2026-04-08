import { Link } from "react-router-dom";
import { problemCategories } from "@/data/mockData";

export default function ShopByProblem() {
  return (
    <section className="bg-secondary/50 py-10">
      <div className="container">
        <h2 className="text-xl md:text-2xl font-bold text-foreground mb-6">Shop by Problem</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {problemCategories.map(cat => (
            <Link
              key={cat.slug}
              to={`/products?problem=${cat.slug}`}
              className="group bg-card rounded-xl p-4 shadow-card hover:shadow-elevated hover:-translate-y-0.5 transition-all duration-300 text-center"
            >
              <span className="text-3xl block mb-2">{cat.icon}</span>
              <p className="text-sm font-semibold text-foreground mb-0.5">{cat.name}</p>
              <p className="text-xs text-muted-foreground">{cat.count} products</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

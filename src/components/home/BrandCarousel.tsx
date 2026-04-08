import { brands } from "@/data/mockData";

export default function BrandCarousel() {
  return (
    <section className="container py-10">
      <h2 className="text-xl md:text-2xl font-bold text-foreground mb-6 text-center">Trusted Brands</h2>
      <div className="flex items-center gap-6 overflow-x-auto scrollbar-hide pb-2">
        {brands.map(brand => (
          <div key={brand} className="shrink-0 bg-card rounded-lg px-6 py-4 shadow-card border hover:shadow-elevated transition-shadow cursor-pointer">
            <span className="text-sm font-semibold text-foreground whitespace-nowrap">{brand}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

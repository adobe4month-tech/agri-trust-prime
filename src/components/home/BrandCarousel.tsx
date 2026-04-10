import { brands } from "@/data/mockData";
import { useScrollReveal } from "@/hooks/useAnimations";

export default function BrandCarousel() {
  const ref = useScrollReveal();

  return (
    <section className="py-12 md:py-16 overflow-hidden">
      <div ref={ref} className="container reveal-section">
        <div className="text-center mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary/60 mb-2">Our Partners</p>
          <h2 className="text-2xl md:text-3xl font-extrabold text-foreground">
            Trusted <span className="text-gradient-green">Brands</span>
          </h2>
        </div>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent z-10" />

        <div className="flex" style={{ animation: "marquee 25s linear infinite" }}>
          {[...brands, ...brands].map((brand, i) => (
            <div
              key={`${brand}-${i}`}
              className="shrink-0 mx-2"
            >
              <div className="bg-card border border-border/50 rounded-lg px-6 py-3.5 hover:border-primary/20 hover:shadow-card transition-all duration-200 cursor-pointer">
                <span className="text-sm font-bold text-foreground whitespace-nowrap hover:text-primary transition-colors">
                  {brand}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

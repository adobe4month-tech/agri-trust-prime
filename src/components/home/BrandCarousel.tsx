import { brands } from "@/data/mockData";
import { useScrollReveal } from "@/hooks/useAnimations";

export default function BrandCarousel() {
  const ref = useScrollReveal();

  return (
    <section className="py-14 md:py-20 overflow-hidden">
      <div ref={ref} className="container reveal-section">
        <div className="text-center mb-10">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary/60 mb-2">Our Partners</p>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-foreground">
            Trusted <span className="text-gradient-green">Brands</span>
          </h2>
        </div>
      </div>

      {/* Infinite marquee */}
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />

        <div className="flex animate-marquee">
          {[...brands, ...brands].map((brand, i) => (
            <div
              key={`${brand}-${i}`}
              className="shrink-0 mx-3 gradient-border rounded-xl cursor-pointer group"
            >
              <div className="bg-card rounded-xl px-8 py-5 group-hover:bg-secondary/50 transition-colors duration-300">
                <span className="text-sm font-bold text-foreground whitespace-nowrap group-hover:text-primary transition-colors duration-300">
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

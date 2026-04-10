import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, ShieldCheck, Truck, Banknote } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import heroImg from "@/assets/hero-farm.jpg";

const slides = [
  {
    title: "Spring Season Sale",
    titleAccent: "Up to 30% Off",
    subtitle: "Premium seeds, pesticides & herbicides for the Kharif season",
    cta: "Shop Sale",
    ctaLink: "/products?sale=true",
  },
  {
    title: "Pakistan's Trusted",
    titleAccent: "Agri Store",
    subtitle: "100% original products from 35+ top agricultural brands",
    cta: "Explore Products",
    ctaLink: "/products",
  },
  {
    title: "Free Delivery on",
    titleAccent: "1000+ Products",
    subtitle: "Nationwide delivery with Cash on Delivery available",
    cta: "Shop Now",
    ctaLink: "/products",
  },
];

const quickCategories = [
  { label: "Pesticides", to: "/products?category=pesticide" },
  { label: "Seeds", to: "/products?category=seed" },
  { label: "Herbicides", to: "/products?category=herbicide" },
  { label: "Fertilizers", to: "/products?category=fertilizer" },
  { label: "Machinery", to: "/products?category=machinery" },
];

export default function HeroSection() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive(prev => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const slide = slides[active];

  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div className="relative min-h-[420px] md:min-h-[480px] lg:min-h-[520px]">
        <img
          src={heroImg}
          alt="Lush Pakistani farmland"
          className="absolute inset-0 w-full h-full object-cover"
          width={1920}
          height={800}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-agri-deep/90 via-agri-deep/75 to-agri-deep/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-agri-deep/50 via-transparent to-transparent" />

        {/* Content */}
        <div className="relative container flex items-center min-h-[420px] md:min-h-[480px] lg:min-h-[520px]">
          <div className="max-w-xl space-y-5">
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 rounded-full px-4 py-1.5"
              style={{ animation: "fade-up 0.5s ease-out both" }}
            >
              <ShieldCheck className="h-3.5 w-3.5 text-agri-gold" />
              <span className="text-[11px] font-semibold text-primary-foreground/90">100% Verified Products</span>
            </div>

            {/* Heading — smooth transition */}
            <div key={active} style={{ animation: "fade-up 0.5s ease-out both" }}>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-primary-foreground leading-[1.1]">
                {slide.title}
              </h2>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-agri-gold leading-[1.1] mt-1">
                {slide.titleAccent}
              </h2>
            </div>

            <p
              className="text-primary-foreground/70 text-sm md:text-base max-w-md leading-relaxed"
              key={`sub-${active}`}
              style={{ animation: "fade-up 0.5s ease-out 0.1s both" }}
            >
              {slide.subtitle}
            </p>

            {/* CTAs */}
            <div
              className="flex flex-wrap gap-3 pt-1"
              style={{ animation: "fade-up 0.5s ease-out 0.2s both" }}
            >
              <Button asChild variant="hero" size="lg">
                <Link to={slide.ctaLink}>
                  <Sparkles className="h-4 w-4" /> {slide.cta} <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="hero-outline" size="lg">
                <a href="https://wa.me/923240287276" target="_blank" rel="noopener noreferrer">
                  Talk to Agronomist
                </a>
              </Button>
            </div>

            {/* Slide dots */}
            <div className="flex items-center gap-2 pt-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === active ? "w-8 bg-agri-gold" : "w-3 bg-primary-foreground/30 hover:bg-primary-foreground/50"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Floating stats on right (desktop) */}
          <div className="hidden lg:flex flex-col gap-3 absolute right-8 top-1/2 -translate-y-1/2">
            {[
              { value: "12,500+", label: "Farmers" },
              { value: "35+", label: "Brands" },
              { value: "120+", label: "Cities" },
            ].map((stat, i) => (
              <div
                key={i}
                className="bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/15 rounded-xl px-5 py-3 text-center"
                style={{ animation: `fade-up 0.4s ease-out ${0.3 + i * 0.1}s both` }}
              >
                <p className="text-lg font-extrabold text-agri-gold">{stat.value}</p>
                <p className="text-[10px] text-primary-foreground/60 uppercase tracking-wider font-semibold">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Category quick strip */}
      <div className="bg-card border-b border-border/50">
        <div className="container">
          <div className="flex items-center gap-1 py-2 overflow-x-auto scrollbar-hide">
            <span className="text-xs font-bold text-muted-foreground shrink-0 mr-2">Quick:</span>
            {quickCategories.map(cat => (
              <Link
                key={cat.to}
                to={cat.to}
                className="shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
              >
                {cat.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Trust strip — 3 items inline */}
      <div className="bg-secondary/50 border-b border-border/30">
        <div className="container py-2.5">
          <div className="flex items-center justify-center gap-6 md:gap-10 text-xs font-semibold text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-primary" />
              <span>100% Original</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Truck className="h-4 w-4 text-primary" />
              <span>Free Delivery</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Banknote className="h-4 w-4 text-primary" />
              <span>Cash on Delivery</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

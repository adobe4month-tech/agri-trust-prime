import heroImg from "@/assets/hero-farm.jpg";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useTypewriter } from "@/hooks/useAnimations";

export default function HeroSection() {
  const tagline = useTypewriter("Pakistan's #1 Trusted Agricultural Marketplace", 35, 800);

  return (
    <section className="relative overflow-hidden min-h-[520px] md:min-h-[600px] lg:min-h-[680px]">
      {/* Background image with parallax-like zoom */}
      <img
        src={heroImg}
        alt="Lush Pakistani farmland at sunrise"
        className="absolute inset-0 w-full h-full object-cover scale-105"
        width={1920}
        height={800}
      />

      {/* Multi-layer gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-r from-agri-deep/95 via-agri-deep/80 to-agri-deep/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-agri-deep/60 via-transparent to-transparent" />

      {/* Subtle grain texture for premium feel */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
      }} />

      {/* Decorative orbs */}
      <div className="absolute top-20 right-[20%] w-72 h-72 rounded-full bg-agri-gold/10 blur-[100px] float" />
      <div className="absolute bottom-10 left-[10%] w-96 h-96 rounded-full bg-primary/15 blur-[120px]" />

      {/* Content */}
      <div className="relative container flex items-center min-h-[520px] md:min-h-[600px] lg:min-h-[680px]">
        <div className="max-w-2xl space-y-6 md:space-y-8">
          {/* Animated badge */}
          <div
            className="inline-flex items-center gap-2.5 glass-card rounded-full px-5 py-2"
            style={{ animation: "hero-badge-enter 0.6s ease-out 0.3s both" }}
          >
            <div className="w-2 h-2 rounded-full bg-agri-gold animate-pulse-soft" />
            <ShieldCheck className="h-4 w-4 text-agri-gold" />
            <span className="text-xs md:text-sm font-semibold text-white/90 tracking-wide">100% Verified Agricultural Products</span>
          </div>

          {/* Hero heading with staggered reveal */}
          <div>
            <h2
              className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.1] tracking-tight"
              style={{ animation: "hero-text-reveal 0.8s ease-out 0.5s both" }}
            >
              Pakistan's Trusted
            </h2>
            <h2
              className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-gradient-gold leading-[1.1] tracking-tight mt-1"
              style={{ animation: "hero-text-reveal 0.8s ease-out 0.7s both" }}
            >
              Agri Store
            </h2>
          </div>

          {/* Typewriter tagline */}
          <p
            className="text-white/70 text-base md:text-xl max-w-lg font-light leading-relaxed"
            style={{ animation: "hero-text-reveal 0.8s ease-out 0.9s both" }}
          >
            {tagline}
            <span className="animate-pulse-soft text-agri-gold">|</span>
          </p>

          {/* Premium CTA buttons */}
          <div
            className="flex flex-wrap gap-4 pt-2"
            style={{ animation: "hero-text-reveal 0.8s ease-out 1.1s both" }}
          >
            <Button asChild variant="hero" size="xl">
              <Link to="/products">
                <Sparkles className="h-5 w-5" /> Shop Now <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="hero-outline" size="xl">
              <a href="https://wa.me/923240287276" target="_blank" rel="noopener noreferrer">
                Talk to Agronomist
              </a>
            </Button>
          </div>

          {/* Mini trust stats */}
          <div
            className="flex items-center gap-6 pt-4"
            style={{ animation: "hero-text-reveal 0.8s ease-out 1.3s both" }}
          >
            {[
              { value: "12,500+", label: "Farmers" },
              { value: "35+", label: "Brands" },
              { value: "120+", label: "Cities" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-lg md:text-xl font-bold text-agri-gold">{stat.value}</p>
                <p className="text-[10px] md:text-xs text-white/50 uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom fade to page background */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}

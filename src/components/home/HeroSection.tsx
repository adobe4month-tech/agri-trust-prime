import heroImg from "@/assets/hero-farm.jpg";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <img src={heroImg} alt="Lush Pakistani farmland at sunrise" className="absolute inset-0 w-full h-full object-cover" width={1920} height={800} />
      <div className="absolute inset-0 bg-gradient-to-r from-agri-deep/90 via-agri-deep/70 to-transparent" />

      <div className="relative container py-16 md:py-28 lg:py-36">
        <div className="max-w-xl space-y-5">
          <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm rounded-full px-4 py-1.5 border border-primary-foreground/20">
            <ShieldCheck className="h-4 w-4 text-agri-gold" />
            <span className="text-xs font-medium text-primary-foreground">100% Verified Agricultural Products</span>
          </div>

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-primary-foreground leading-tight">
            Pakistan's Trusted
            <br />
            <span className="text-agri-gold">Agri Store</span>
          </h2>

          <p className="text-primary-foreground/80 text-base md:text-lg max-w-md">
            Seeds, pesticides, fertilizers & machinery — delivered to your doorstep from the country's best brands.
          </p>

          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold shadow-lg">
              <Link to="/products">
                Shop Now <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 backdrop-blur-sm">
              <a href="https://wa.me/923240287276" target="_blank" rel="noopener noreferrer">
                Talk to Agronomist
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

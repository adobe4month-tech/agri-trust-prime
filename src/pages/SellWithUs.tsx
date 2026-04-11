import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
import WhatsAppFAB from "@/components/WhatsAppFAB";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { MessageCircle, Phone, Globe, Users, TrendingUp, Headphones, Package, ArrowRight, Star } from "lucide-react";
import { useScrollReveal } from "@/hooks/useAnimations";

export default function SellWithUs() {
  const { language, t } = useLanguage();
  const ref = useScrollReveal();

  const benefits = [
    { icon: Globe, title: language === "ru" ? "Poore Pakistan Mein Reach" : "Nationwide Reach", desc: language === "ru" ? "120+ shehron mein apni products bechein" : "Sell your products in 120+ cities across Pakistan" },
    { icon: Users, title: language === "ru" ? "12,500+ Kissan" : "12,500+ Farmers", desc: language === "ru" ? "Hamara bharosemand customer base" : "Our trusted and growing customer base" },
    { icon: TrendingUp, title: language === "ru" ? "Marketing Support" : "Marketing Support", desc: language === "ru" ? "Hum aapki products ki marketing karenge" : "We promote your products through our channels" },
    { icon: Headphones, title: language === "ru" ? "Aasaan Onboarding" : "Easy Onboarding", desc: language === "ru" ? "Sirf WhatsApp par baat karein, hum sab karenge" : "Just talk to us on WhatsApp, we handle the rest" },
  ];

  const steps = [
    { num: "01", title: language === "ru" ? "Rabta Karein" : "Contact Us", desc: language === "ru" ? "WhatsApp ya phone par hum se baat karein" : "Reach out via WhatsApp or phone call" },
    { num: "02", title: language === "ru" ? "Products List Karein" : "List Products", desc: language === "ru" ? "Apni products ki details aur photos bhejein" : "Share product details, images, and pricing" },
    { num: "03", title: language === "ru" ? "Bechna Shuru Karein" : "Start Selling", desc: language === "ru" ? "Hum aapki products list karke orders laayenge" : "We list your products and bring in orders" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title="Sell With Us - Partner with Kissan Cares"
        description="Sell your agricultural products across Pakistan. Partner with Kissan Cares and reach 12,500+ farmers nationwide."
        canonical="https://kissancares.com/sell-with-us"
      />
      <Header />

      <main className="flex-1 pb-20 lg:pb-0">
        {/* Hero */}
        <div className="bg-gradient-to-br from-agri-deep via-agri-mid to-agri-deep relative overflow-hidden">
          <div className="absolute inset-0 bg-mesh opacity-30" />
          <div className="container py-16 md:py-24 relative text-center">
            <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 rounded-full px-4 py-1.5 mb-6" style={{ animation: "fade-up 0.5s ease-out both" }}>
              <Package className="h-3.5 w-3.5 text-agri-gold" />
              <span className="text-[11px] font-semibold text-primary-foreground/90">
                {language === "ru" ? "Brand Partners Ka Intezaar" : "Now Accepting Brand Partners"}
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-primary-foreground leading-tight max-w-2xl mx-auto" style={{ animation: "fade-up 0.5s ease-out 0.1s both" }}>
              {t("sell.hero")}
            </h1>
            <p className="text-primary-foreground/60 text-sm md:text-base mt-4 max-w-lg mx-auto" style={{ animation: "fade-up 0.5s ease-out 0.2s both" }}>
              {t("sell.heroSub")}
            </p>
            <div className="flex flex-wrap justify-center gap-3 mt-8" style={{ animation: "fade-up 0.5s ease-out 0.3s both" }}>
              <Button asChild variant="hero" size="lg">
                <a href="https://wa.me/923240287276?text=Hi, I'm interested in selling my products on KissanCares." target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-4 w-4" /> {t("sell.cta")}
                </a>
              </Button>
            </div>
            <p className="text-primary-foreground/40 text-xs mt-4">
              {t("sell.callUs")} <a href="tel:+923240287276" className="text-agri-gold hover:underline">0324-028-7276</a>
            </p>
          </div>
        </div>

        <Breadcrumbs items={[{ label: t("nav.home"), to: "/" }, { label: language === "ru" ? "Hamare Saath Bechein" : "Sell With Us" }]} />

        {/* Benefits */}
        <section ref={ref} className="container reveal-section py-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 stagger-children revealed">
            {benefits.map((b, i) => (
              <div key={i} className="premium-card p-6 text-center">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mx-auto mb-4">
                  <b.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-sm font-bold text-foreground mb-2">{b.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section className="bg-secondary/30 py-12">
          <div className="container">
            <h2 className="text-xl md:text-2xl font-extrabold text-foreground text-center mb-8">{t("sell.howItWorks")}</h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              {steps.map((step, i) => (
                <div key={i} className="text-center relative">
                  <div className="w-16 h-16 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4 text-2xl font-extrabold">
                    {step.num}
                  </div>
                  <h3 className="text-sm font-bold text-foreground mb-1">{step.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
                  {i < 2 && (
                    <ArrowRight className="hidden md:block absolute top-8 -right-3 h-5 w-5 text-muted-foreground/30" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonial */}
        <section className="container py-12">
          <div className="premium-card p-8 max-w-2xl mx-auto text-center bg-primary/5">
            <div className="flex items-center justify-center gap-0.5 mb-3">
              {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-agri-gold text-agri-gold" />)}
            </div>
            <p className="text-sm text-foreground italic leading-relaxed mb-4">
              {language === "ru"
                ? "\"KissanCares ke saath partnership se hamari sales 3x barh gayi. Unki team bohat cooperative hai aur payment time par aata hai.\""
                : "\"Partnering with KissanCares grew our sales 3x. Their team is very cooperative and payments are always on time.\""}
            </p>
            <p className="text-xs font-bold text-foreground">Saver Enterprise</p>
            <p className="text-[10px] text-muted-foreground">
              {language === "ru" ? "Brand Partner — 2 Saal Se" : "Brand Partner — 2 Years"}
            </p>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="container pb-12">
          <div className="bg-agri-deep rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-xl md:text-2xl font-extrabold text-primary-foreground mb-4">
              {language === "ru" ? "Aaj Hi Shuru Karein" : "Get Started Today"}
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              <Button asChild variant="hero" size="lg">
                <a href="https://wa.me/923240287276?text=Hi, I want to sell my products on KissanCares." target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-4 w-4" /> {t("sell.cta")}
                </a>
              </Button>
              <Button asChild variant="hero-outline" size="lg">
                <a href="tel:+923240287276">
                  <Phone className="h-4 w-4" /> 0324-028-7276
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppFAB />
      <BottomNav />
    </div>
  );
}

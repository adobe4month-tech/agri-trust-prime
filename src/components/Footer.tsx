import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, ArrowUpRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/useAnimations";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Footer() {
  const ref = useScrollReveal(0.1);
  const { language, t } = useLanguage();

  const quickLinks = [
    { label: t("nav.home"), to: "/" },
    { label: language === "ru" ? "Hamare Baare Mein" : "About Us", to: "/about" },
    { label: t("nav.education"), to: "/education" },
    { label: language === "ru" ? "Hamare Saath Bechein" : "Sell With Us", to: "/sell-with-us" },
    { label: "FAQ", to: "/faq" },
    { label: t("nav.track"), to: "/track" },
  ];

  const categoryLinks = [
    { label: t("nav.seeds"), to: "/products?category=seed" },
    { label: t("nav.pesticides"), to: "/products?category=pesticide" },
    { label: t("nav.herbicides"), to: "/products?category=herbicide" },
    { label: t("nav.fertilizers"), to: "/products?category=fertilizer" },
  ];

  const helpLinks = [
    { label: language === "ru" ? "Rabta Karein" : "Contact Us", to: "/contact" },
    { label: language === "ru" ? "Coupon Codes" : "Coupons", to: "/coupons" },
    { label: language === "ru" ? "Tamam Brands" : "All Brands", to: "/brands" },
    { label: "Seller Login", to: "/seller-login" },
  ];

  return (
    <footer ref={ref} className="reveal-section relative bg-agri-deep text-primary-foreground pb-24 lg:pb-0 overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-primary/10 blur-[150px]" />

      <div className="container py-14 relative">
        <div className="grid md:grid-cols-5 gap-10 md:gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary-foreground/10 backdrop-blur-sm flex items-center justify-center">
                <span className="font-extrabold text-sm text-primary-foreground">KC</span>
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-primary-foreground">KISSAN</h3>
                <p className="text-[9px] tracking-[0.25em] uppercase text-primary-foreground/50 font-bold">Cares</p>
              </div>
            </div>
            <p className="text-sm text-primary-foreground/50 leading-relaxed">
              {language === "ru"
                ? "Pakistan ka bharosemand online zar'ai store. Asli products, maahir rahnumai, poore mulk mein delivery."
                : "Pakistan's trusted online agricultural store. Original products, expert guidance, nationwide delivery."}
            </p>
          </div>

          <div>
            <h4 className="font-bold text-sm mb-5 text-primary-foreground/80 uppercase tracking-wider">{t("footer.quickLinks")}</h4>
            <div className="space-y-3">
              {quickLinks.map(l => (
                <Link key={l.to} to={l.to} className="group flex items-center gap-1 text-sm text-primary-foreground/40 hover:text-agri-gold transition-colors duration-300">
                  {l.label} <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-sm mb-5 text-primary-foreground/80 uppercase tracking-wider">{t("footer.categories")}</h4>
            <div className="space-y-3">
              {categoryLinks.map(l => (
                <Link key={l.to} to={l.to} className="group flex items-center gap-1 text-sm text-primary-foreground/40 hover:text-agri-gold transition-colors duration-300">
                  {l.label} <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-sm mb-5 text-primary-foreground/80 uppercase tracking-wider">{t("footer.helpCenter")}</h4>
            <div className="space-y-3">
              {helpLinks.map(l => (
                <Link key={l.to} to={l.to} className="group flex items-center gap-1 text-sm text-primary-foreground/40 hover:text-agri-gold transition-colors duration-300">
                  {l.label} <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-sm mb-5 text-primary-foreground/80 uppercase tracking-wider">{t("footer.contactUs")}</h4>
            <div className="space-y-4">
              <a href="tel:+923240287276" className="flex items-center gap-3 text-sm text-primary-foreground/40 hover:text-agri-gold transition-colors group">
                <div className="w-8 h-8 rounded-lg bg-primary-foreground/5 flex items-center justify-center group-hover:bg-agri-gold/20 transition-colors">
                  <Phone className="h-4 w-4" />
                </div>
                +92 324 028 7276
              </a>
              <a href="mailto:info@kissancares.com" className="flex items-center gap-3 text-sm text-primary-foreground/40 hover:text-agri-gold transition-colors group">
                <div className="w-8 h-8 rounded-lg bg-primary-foreground/5 flex items-center justify-center group-hover:bg-agri-gold/20 transition-colors">
                  <Mail className="h-4 w-4" />
                </div>
                info@kissancares.com
              </a>
              <div className="flex items-start gap-3 text-sm text-primary-foreground/40">
                <div className="w-8 h-8 rounded-lg bg-primary-foreground/5 flex items-center justify-center shrink-0">
                  <MapPin className="h-4 w-4" />
                </div>
                Sargodha, Punjab, Pakistan
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-primary-foreground/30">{t("footer.copyright")}</p>
          <p className="text-xs text-primary-foreground/30">{t("footer.trustedBy")}</p>
        </div>
      </div>
    </footer>
  );
}

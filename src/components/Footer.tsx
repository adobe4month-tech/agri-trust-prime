import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, ArrowUpRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/useAnimations";

export default function Footer() {
  const ref = useScrollReveal(0.1);

  return (
    <footer ref={ref} className="reveal-section relative bg-agri-deep text-white pb-24 lg:pb-0 overflow-hidden">
      {/* Decorative gradient orb */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-primary/10 blur-[150px]" />

      <div className="container py-14 relative">
        <div className="grid md:grid-cols-4 gap-10 md:gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                <span className="font-extrabold text-sm text-white">KC</span>
              </div>
              <div>
                <h3 className="text-lg font-extrabold">KISSAN</h3>
                <p className="text-[9px] tracking-[0.25em] uppercase text-white/50 font-bold">Cares</p>
              </div>
            </div>
            <p className="text-sm text-white/50 leading-relaxed">
              Pakistan's trusted online agricultural store. Original products, expert guidance, nationwide delivery.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-sm mb-5 text-white/80 uppercase tracking-wider">Quick Links</h4>
            <div className="space-y-3">
              {["Home", "Products", "Brands", "About Us", "Contact"].map(l => (
                <Link key={l} to="/" className="group flex items-center gap-1 text-sm text-white/40 hover:text-agri-gold transition-colors duration-300">
                  {l} <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-sm mb-5 text-white/80 uppercase tracking-wider">Categories</h4>
            <div className="space-y-3">
              {["Seeds", "Pesticides", "Herbicides", "Fertilizers", "Machinery"].map(l => (
                <Link key={l} to="/" className="group flex items-center gap-1 text-sm text-white/40 hover:text-agri-gold transition-colors duration-300">
                  {l} <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-sm mb-5 text-white/80 uppercase tracking-wider">Contact Us</h4>
            <div className="space-y-4">
              <a href="tel:+923240287276" className="flex items-center gap-3 text-sm text-white/40 hover:text-agri-gold transition-colors group">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-agri-gold/20 transition-colors">
                  <Phone className="h-4 w-4" />
                </div>
                +92 324 028 7276
              </a>
              <a href="mailto:info@kissancares.com" className="flex items-center gap-3 text-sm text-white/40 hover:text-agri-gold transition-colors group">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-agri-gold/20 transition-colors">
                  <Mail className="h-4 w-4" />
                </div>
                info@kissancares.com
              </a>
              <div className="flex items-start gap-3 text-sm text-white/40">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                  <MapPin className="h-4 w-4" />
                </div>
                Pakistan
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/30">© 2026 Kissan Cares. All rights reserved.</p>
          <p className="text-xs text-white/30">Secure Payments • Trusted by 12,500+ Farmers</p>
        </div>
      </div>
    </footer>
  );
}

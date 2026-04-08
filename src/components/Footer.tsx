import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-agri-deep text-primary-foreground pb-20 lg:pb-0">
      <div className="container py-10">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-3">KISSAN Cares</h3>
            <p className="text-sm text-primary-foreground/70 leading-relaxed">
              Pakistan's trusted online agricultural store. Original products, expert guidance, nationwide delivery.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Quick Links</h4>
            <div className="space-y-2">
              {["Home", "Products", "Brands", "About Us", "Contact"].map(l => (
                <Link key={l} to="/" className="block text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">{l}</Link>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Categories</h4>
            <div className="space-y-2">
              {["Seeds", "Pesticides", "Herbicides", "Fertilizers", "Machinery"].map(l => (
                <Link key={l} to="/" className="block text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">{l}</Link>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-primary-foreground/70">
                <Phone className="h-4 w-4 shrink-0" /> +92 324 028 7276
              </div>
              <div className="flex items-center gap-2 text-sm text-primary-foreground/70">
                <Mail className="h-4 w-4 shrink-0" /> info@kissancares.com
              </div>
              <div className="flex items-start gap-2 text-sm text-primary-foreground/70">
                <MapPin className="h-4 w-4 shrink-0 mt-0.5" /> Pakistan
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-primary-foreground/10 mt-8 pt-6 text-center">
          <p className="text-xs text-primary-foreground/50">© 2026 Kissan Cares. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

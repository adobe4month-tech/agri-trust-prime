import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { useCart } from "@/contexts/CartContext";
import { User, Package, Heart, MapPin, LogOut } from "lucide-react";

export default function Account() {
  const { language } = useLanguage();
  const { totalWishlist } = useWishlist();
  const { totalItems } = useCart();
  const t = (en: string, ru: string) => (language === "ru" ? ru : en);
  const phone = typeof window !== "undefined" ? localStorage.getItem("kc-user-phone") : null;

  return (
    <div className="min-h-screen bg-background">
      <SEOHead title="My Account — KissanCares" description="Your KissanCares account." />
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-extrabold mb-6">{t("My Account", "Mera Account")}</h1>
        <div className="bg-card border border-border rounded-2xl p-6 mb-6 flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center"><User className="h-7 w-7 text-primary" /></div>
          <div className="flex-1">
            <p className="font-bold text-foreground">{phone || t("Guest User", "Mehmaan")}</p>
            <p className="text-xs text-muted-foreground">{phone ? t("Verified via OTP", "OTP se verified") : t("Login to track orders", "Order track karne ke liye login karein")}</p>
          </div>
          {!phone && <Button asChild variant="hero" size="sm"><Link to="/seller-login">{t("Login", "Login")}</Link></Button>}
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <Link to="/track" className="bg-card border border-border rounded-2xl p-5 hover:border-primary transition-colors flex items-center gap-4">
            <Package className="h-8 w-8 text-primary" />
            <div><p className="font-bold">{t("My Orders", "Mere Orders")}</p><p className="text-xs text-muted-foreground">{t("Track your shipments", "Order track karein")}</p></div>
          </Link>
          <Link to="/wishlist" className="bg-card border border-border rounded-2xl p-5 hover:border-primary transition-colors flex items-center gap-4">
            <Heart className="h-8 w-8 text-primary" />
            <div><p className="font-bold">{t("Wishlist", "Pasandeeda")} ({totalWishlist})</p><p className="text-xs text-muted-foreground">{t("Saved products", "Mehfooz kiye products")}</p></div>
          </Link>
          <Link to="/cart" className="bg-card border border-border rounded-2xl p-5 hover:border-primary transition-colors flex items-center gap-4">
            <Package className="h-8 w-8 text-primary" />
            <div><p className="font-bold">{t("Cart", "Cart")} ({totalItems})</p><p className="text-xs text-muted-foreground">{t("Continue shopping", "Khareedari jari rakhein")}</p></div>
          </Link>
          <Link to="/stores" className="bg-card border border-border rounded-2xl p-5 hover:border-primary transition-colors flex items-center gap-4">
            <MapPin className="h-8 w-8 text-primary" />
            <div><p className="font-bold">{t("Store Locator", "Stores Dekhein")}</p><p className="text-xs text-muted-foreground">{t("Find nearest store", "Qareebi store dhoondein")}</p></div>
          </Link>
        </div>

        {phone && (
          <Button variant="outline" className="mt-6 text-destructive" onClick={() => { localStorage.removeItem("kc-user-phone"); window.location.reload(); }}>
            <LogOut className="h-4 w-4" />{t("Logout", "Logout")}
          </Button>
        )}
      </main>
      <Footer />
    </div>
  );
}

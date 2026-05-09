import { Search, ShoppingCart, User, Menu, Phone, MapPin, Globe, Heart, FileText } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import CartDrawer from "@/components/CartDrawer";
import AuthModal from "@/components/AuthModal";
import SearchAutocomplete from "@/components/SearchAutocomplete";
import LoyaltyBadge from "@/components/LoyaltyBadge";

export default function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { language, setLanguage, t } = useLanguage();
  const navigate = useNavigate();
  const { totalItems } = useCart();
  const { totalWishlist } = useWishlist();

  const navLinks = [
    { label: t("nav.home"), to: "/" },
    { label: t("nav.seeds"), to: "/products?category=seed" },
    { label: t("nav.pesticides"), to: "/products?category=pesticide" },
    { label: t("nav.herbicides"), to: "/products?category=herbicide" },
    { label: t("nav.fertilizers"), to: "/products?category=fertilizer" },
    { label: t("nav.brands"), to: "/brands" },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 bg-card border-b border-border/50">
        {/* Top bar */}
        <div className="bg-agri-deep">
          <div className="container flex items-center justify-between py-1.5">
            <p className="text-[11px] font-semibold text-primary-foreground/80 hidden sm:block" dir="rtl">
              پاکستان کا نمبر 1 زرعی سٹور
            </p>
            <div className="flex items-center gap-4 mx-auto sm:mx-0">
              <a href="tel:+923240287276" className="flex items-center gap-1.5 text-[11px] text-primary-foreground/80 hover:text-agri-gold transition-colors">
                <Phone className="h-3 w-3" />
                <span className="font-semibold">0324-028-7276</span>
              </a>
              <span className="text-primary-foreground/30">|</span>
              <Link to="/track" className="text-[11px] text-primary-foreground/80 hover:text-agri-gold transition-colors font-semibold flex items-center gap-1">
                <MapPin className="h-3 w-3" /> {t("nav.track")}
              </Link>
              <span className="text-primary-foreground/30">|</span>
              <Link to="/seller-login" className="text-[11px] text-primary-foreground/80 hover:text-agri-gold transition-colors font-semibold">
                {language === "ru" ? "Seller Login" : "Seller Login"}
              </Link>
              <span className="text-primary-foreground/30">|</span>
              <button
                onClick={() => setLanguage(language === "en" ? "ru" : "en")}
                className="flex items-center gap-1 text-[11px] text-primary-foreground/80 hover:text-agri-gold transition-colors font-semibold"
              >
                <Globe className="h-3 w-3" />
                {language === "en" ? "اردو" : "EN"}
              </button>
            </div>
          </div>
        </div>

        {/* Main header */}
        <div className="container flex items-center gap-4 py-3">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 bg-card p-0">
              <div className="p-6 border-b bg-secondary/50">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-primary flex items-center justify-center">
                    <span className="text-primary-foreground font-extrabold text-sm">KC</span>
                  </div>
                  <div>
                    <h2 className="text-lg font-extrabold text-foreground leading-none">KISSAN</h2>
                    <p className="text-[10px] text-muted-foreground tracking-[0.25em] uppercase font-semibold">Cares</p>
                  </div>
                </div>
              </div>
              <div className="p-4 flex flex-col gap-1">
                {navLinks.map(l => (
                  <Link key={l.to} to={l.to} className="px-4 py-3 rounded-xl text-foreground hover:bg-primary/5 hover:text-primary transition-all font-semibold text-sm">
                    {l.label}
                  </Link>
                ))}
                <Link to="/education" className="px-4 py-3 rounded-xl text-foreground hover:bg-primary/5 hover:text-primary transition-all font-semibold text-sm">
                  {t("nav.education")}
                </Link>
                <Link to="/coupons" className="px-4 py-3 rounded-xl text-foreground hover:bg-primary/5 hover:text-primary transition-all font-semibold text-sm">
                  {language === "ru" ? "Coupon Codes" : "Coupons"}
                </Link>
                <Link to="/sell-with-us" className="px-4 py-3 rounded-xl text-foreground hover:bg-primary/5 hover:text-primary transition-all font-semibold text-sm">
                  {language === "ru" ? "Hamare Saath Bechein" : "Sell With Us"}
                </Link>
                <Link to="/about" className="px-4 py-3 rounded-xl text-foreground hover:bg-primary/5 hover:text-primary transition-all font-semibold text-sm">
                  {language === "ru" ? "Hamare Baare Mein" : "About Us"}
                </Link>
                <Link to="/contact" className="px-4 py-3 rounded-xl text-foreground hover:bg-primary/5 hover:text-primary transition-all font-semibold text-sm">
                  {language === "ru" ? "Rabta Karein" : "Contact Us"}
                </Link>
                <Link to="/faq" className="px-4 py-3 rounded-xl text-foreground hover:bg-primary/5 hover:text-primary transition-all font-semibold text-sm">
                  FAQ
                </Link>
                <Link to="/get-quote" className="px-4 py-3 rounded-xl text-foreground hover:bg-primary/5 hover:text-primary transition-all font-semibold text-sm">
                  {language === "ru" ? "Quote Mangwayein" : "Get Quote"}
                </Link>
                <Link to="/privacy" className="px-4 py-3 rounded-xl text-foreground hover:bg-primary/5 hover:text-primary transition-all font-semibold text-sm">
                  {language === "ru" ? "Policies" : "Policies"}
                </Link>
              </div>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
              <span className="text-primary-foreground font-extrabold text-sm">KC</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-extrabold text-foreground leading-none tracking-tight">KISSAN</h1>
              <p className="text-[9px] text-muted-foreground tracking-[0.25em] uppercase font-bold">Cares</p>
            </div>
          </Link>

          {/* Search */}
          <div className="flex-1 max-w-xl mx-auto hidden md:block">
            <SearchAutocomplete />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1 ml-auto">
            <LoyaltyBadge />
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setSearchOpen(!searchOpen)}>
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="relative" asChild>
              <Link to="/get-quote">
                <FileText className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setAuthOpen(true)}>
              <User className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="relative">
              <Link to="/" onClick={(e) => { e.preventDefault(); }} className="relative">
                <Heart className={`h-5 w-5 ${totalWishlist > 0 ? "text-sale" : ""}`} />
                {totalWishlist > 0 && (
                  <span className="absolute -top-2 -right-2 w-4 h-4 bg-sale text-primary-foreground text-[9px] font-bold rounded-full flex items-center justify-center">
                    {totalWishlist}
                  </span>
                )}
              </Link>
            </Button>
            <Button variant="ghost" size="icon" className="relative" onClick={() => setCartOpen(true)}>
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-accent text-accent-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Button>
          </div>
        </div>

        {/* Mobile search */}
        {searchOpen && (
          <form className="container pb-3 md:hidden animate-fade-in" onSubmit={e => { e.preventDefault(); if (searchQuery.trim()) { navigate(`/search?q=${encodeURIComponent(searchQuery)}`); setSearchOpen(false); } }}>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder={language === "ru" ? "Products talaash karein..." : "Search products..."} className="pl-11 h-11 bg-secondary border-0 rounded-xl" autoFocus />
            </div>
          </form>
        )}

        {/* Desktop nav */}
        <nav className="hidden lg:block border-t border-border/30">
          <div className="container flex items-center gap-8 py-2.5">
            {navLinks.map(l => (
              <Link key={l.to} to={l.to} className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-200 hover:after:w-full">
                {l.label}
              </Link>
            ))}
            <Link to="/coupons" className="text-sm font-semibold text-accent hover:text-accent/80 transition-colors">
              🎟️ {language === "ru" ? "Coupons" : "Coupons"}
            </Link>
            <Link to="/get-quote" className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors">
              {language === "ru" ? "Quote" : "Get Quote"}
            </Link>
            <Link to="/market-rates" className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors">
              {language === "ru" ? "Mandi Rates" : "Market Rates"}
            </Link>
            <Link to="/videos" className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors">
              {language === "ru" ? "Videos" : "Videos"}
            </Link>
            <Link to="/calculator" className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors">
              {language === "ru" ? "Calculator" : "Calculator"}
            </Link>
            <Link to="/education" className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors ml-auto">
              {t("nav.education")}
            </Link>
          </div>
        </nav>
      </header>

      <CartDrawer open={cartOpen} onOpenChange={setCartOpen} />
      <AuthModal open={authOpen} onOpenChange={setAuthOpen} />
    </>
  );
}

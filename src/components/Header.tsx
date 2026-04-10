import { Search, ShoppingCart, User, Menu, Phone, MapPin } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Seeds", to: "/products?category=seed" },
  { label: "Pesticides", to: "/products?category=pesticide" },
  { label: "Herbicides", to: "/products?category=herbicide" },
  { label: "Fertilizers", to: "/products?category=fertilizer" },
  { label: "Brands", to: "/brands" },
];

export default function Header() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-card border-b border-border/50">
      {/* Top bar — bilingual + contact */}
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
              <MapPin className="h-3 w-3" /> Track Order
            </Link>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container flex items-center gap-4 py-3">
        {/* Mobile menu */}
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
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
            <Input
              placeholder="Search seeds, pesticides, fertilizers..."
              className="pl-11 h-11 bg-secondary/60 border border-border rounded-xl text-sm focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:bg-card transition-all"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 ml-auto">
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setSearchOpen(!searchOpen)}>
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="relative">
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-accent text-accent-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
              2
            </span>
          </Button>
        </div>
      </div>

      {/* Mobile search */}
      {searchOpen && (
        <div className="container pb-3 md:hidden animate-fade-in">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search products..." className="pl-11 h-11 bg-secondary border-0 rounded-xl" autoFocus />
          </div>
        </div>
      )}

      {/* Desktop nav */}
      <nav className="hidden lg:block border-t border-border/30">
        <div className="container flex items-center gap-8 py-2.5">
          {navLinks.map(l => (
            <Link key={l.to} to={l.to} className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-200 hover:after:w-full">
              {l.label}
            </Link>
          ))}
          <Link to="/education" className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors ml-auto">
            Kissan Education
          </Link>
        </div>
      </nav>
    </header>
  );
}

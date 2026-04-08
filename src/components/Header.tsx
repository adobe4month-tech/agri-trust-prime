import { Search, ShoppingCart, User, Menu } from "lucide-react";
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
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b">
      {/* Top info bar */}
      <div className="bg-gradient-trust text-primary-foreground text-xs py-1.5">
        <div className="container flex items-center justify-between">
          <span className="hidden sm:inline">📞 +92 324 028 7276</span>
          <span className="font-medium text-center flex-1 sm:flex-none">Pakistan's #1 Agri Store — Free Delivery on 1000+ Products</span>
          <span className="hidden sm:inline">📧 info@kissancares.com</span>
        </div>
      </div>

      {/* Main header */}
      <div className="container flex items-center gap-3 py-3">
        {/* Mobile menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 bg-card">
            <div className="mt-8 flex flex-col gap-1">
              {navLinks.map(l => (
                <Link key={l.to} to={l.to} className="px-4 py-3 rounded-lg text-foreground hover:bg-secondary transition-colors font-medium">
                  {l.label}
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">KC</span>
          </div>
          <div className="hidden sm:block">
            <h1 className="text-lg font-bold text-foreground leading-none">KISSAN</h1>
            <p className="text-[10px] text-muted-foreground tracking-widest uppercase">Cares</p>
          </div>
        </Link>

        {/* Search */}
        <div className="flex-1 max-w-xl mx-auto hidden md:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search seeds, pesticides, fertilizers..."
              className="pl-10 bg-secondary border-0 focus-visible:ring-primary"
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
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-accent text-accent-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
              2
            </span>
          </Button>
        </div>
      </div>

      {/* Mobile search */}
      {searchOpen && (
        <div className="container pb-3 md:hidden animate-slide-up">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search products..." className="pl-10 bg-secondary border-0" autoFocus />
          </div>
        </div>
      )}

      {/* Desktop nav */}
      <nav className="hidden lg:block border-t bg-card">
        <div className="container flex items-center gap-6 py-2">
          {navLinks.map(l => (
            <Link key={l.to} to={l.to} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              {l.label}
            </Link>
          ))}
          <Link to="/education" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors ml-auto">
            Kissan Education
          </Link>
        </div>
      </nav>
    </header>
  );
}

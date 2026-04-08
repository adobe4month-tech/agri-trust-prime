import { Home, Search, Grid3X3, ShoppingCart, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const items = [
  { icon: Home, label: "Home", to: "/" },
  { icon: Search, label: "Search", to: "/search" },
  { icon: Grid3X3, label: "Categories", to: "/categories" },
  { icon: ShoppingCart, label: "Cart", to: "/cart" },
  { icon: User, label: "Account", to: "/account" },
];

export default function BottomNav() {
  const location = useLocation();
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden">
      {/* Glass background */}
      <div className="bg-card/80 backdrop-blur-xl border-t border-border/50 shadow-[0_-4px_24px_hsl(150_20%_10%/0.08)]">
        <div className="flex items-center justify-around py-2.5 pb-safe">
          {items.map(item => {
            const active = location.pathname === item.to;
            return (
              <Link key={item.to} to={item.to} className="flex flex-col items-center gap-1 min-w-[56px] group">
                <div className={`p-1.5 rounded-xl transition-all duration-300 ${active ? "bg-primary/10" : "group-hover:bg-muted"}`}>
                  <item.icon className={`h-5 w-5 transition-all duration-300 ${active ? "text-primary scale-110" : "text-muted-foreground group-hover:text-foreground"}`} />
                </div>
                <span className={`text-[10px] font-semibold transition-colors duration-300 ${active ? "text-primary" : "text-muted-foreground"}`}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

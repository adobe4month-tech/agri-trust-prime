import { Home, Search, Grid3X3, ShoppingCart, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const items = [
  { icon: Home, label: "Home", to: "/" },
  { icon: Search, label: "Search", to: "/search" },
  { icon: Grid3X3, label: "Categories", to: "/categories" },
  { icon: ShoppingCart, label: "Cart", to: "/cart", badge: 2 },
  { icon: User, label: "Account", to: "/account" },
];

export default function BottomNav() {
  const location = useLocation();
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden">
      <div className="bg-card border-t border-border/50 shadow-[0_-2px_12px_hsl(150_20%_10%/0.06)]">
        <div className="flex items-center justify-around py-2 pb-safe">
          {items.map(item => {
            const active = location.pathname === item.to;
            return (
              <Link key={item.to} to={item.to} className="flex flex-col items-center gap-0.5 min-w-[52px] group relative">
                <div className={`p-1.5 rounded-lg transition-colors duration-200 ${active ? "bg-primary/10" : ""}`}>
                  <item.icon className={`h-5 w-5 transition-colors duration-200 ${active ? "text-primary" : "text-muted-foreground"}`} />
                  {item.badge && (
                    <span className="absolute top-0 right-2 w-4 h-4 bg-accent text-accent-foreground text-[9px] font-bold rounded-full flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </div>
                <span className={`text-[10px] font-semibold transition-colors duration-200 ${active ? "text-primary" : "text-muted-foreground"}`}>
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

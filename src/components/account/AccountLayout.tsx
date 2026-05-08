import { Link, useLocation, Navigate } from "react-router-dom";
import { ReactNode, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
import AuthModal from "@/components/AuthModal";
import { User, Package, MapPin, Heart, Coins, Sprout, Bell, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

export default function AccountLayout({ children, title }: { children: ReactNode; title: string }) {
  const { pathname } = useLocation();
  const { language } = useLanguage();
  const t = (en: string, ru: string) => language === "ru" ? ru : en;
  const [authOpen, setAuthOpen] = useState(false);

  const phone = typeof window !== "undefined" ? localStorage.getItem("kc-user-phone") : null;
  if (!phone) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1 max-w-md mx-auto px-4 py-16 text-center w-full">
          <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4"><User className="h-8 w-8 text-primary" /></div>
          <h2 className="text-2xl font-extrabold mb-2">{t("Login Required", "Login Zaruri Hai")}</h2>
          <p className="text-sm text-muted-foreground mb-4">{t("Login to access your account portal.", "Account portal ke liye login karein.")}</p>
          <Button variant="hero" onClick={() => setAuthOpen(true)}>{t("Login with Phone", "Phone Se Login")}</Button>
        </main>
        <AuthModal open={authOpen} onOpenChange={setAuthOpen} />
        <Footer />
        <BottomNav />
      </div>
    );
  }

  const nav = [
    { to: "/account", icon: User, label: t("Profile", "Profile") },
    { to: "/account/orders", icon: Package, label: t("Orders", "Orders") },
    { to: "/account/addresses", icon: MapPin, label: t("Addresses", "Pate") },
    { to: "/account/wishlist", icon: Heart, label: t("Wishlist", "Pasandeeda") },
    { to: "/account/coins", icon: Coins, label: t("Coins", "Coins") },
    { to: "/account/crops", icon: Sprout, label: t("Crop Profile", "Fasal Profile") },
    { to: "/account/notifications", icon: Bell, label: t("Notifications", "Notifications") },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <div className="flex-1 container py-6 pb-24 lg:pb-6">
        <div className="grid lg:grid-cols-[230px_1fr] gap-6">
          <aside className="bg-card border border-border rounded-2xl p-3 h-fit lg:sticky lg:top-24">
            <div className="px-3 py-2 mb-2 flex items-center gap-2 border-b border-border">
              <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center"><User className="h-4 w-4 text-primary" /></div>
              <div className="min-w-0"><p className="text-xs text-muted-foreground">{t("Logged in", "Login")}</p><p className="font-bold text-sm truncate">{phone}</p></div>
            </div>
            <nav className="space-y-1 mt-2 lg:flex-col flex overflow-x-auto">
              {nav.map(n => {
                const active = pathname === n.to;
                return (
                  <Link key={n.to} to={n.to} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-colors shrink-0 ${active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary hover:text-foreground"}`}>
                    <n.icon className="h-4 w-4" />{n.label}
                  </Link>
                );
              })}
              <button onClick={() => { localStorage.removeItem("kc-user-phone"); window.location.href = "/"; }} className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold text-destructive hover:bg-destructive/5 shrink-0">
                <LogOut className="h-4 w-4" />{t("Logout", "Logout")}
              </button>
            </nav>
          </aside>
          <main>
            <h1 className="text-2xl font-extrabold mb-4">{title}</h1>
            {children}
          </main>
        </div>
      </div>
      <Footer />
      <BottomNav />
    </div>
  );
}

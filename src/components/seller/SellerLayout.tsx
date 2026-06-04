import { Link, useLocation, Navigate } from "react-router-dom";
import { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { LayoutDashboard, Package, ShoppingBag, Wallet, LogOut } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSession, useLogout } from "@/hooks/api";

export default function SellerLayout({ children, title }: { children: ReactNode; title: string }) {
  const { pathname } = useLocation();
  const { language } = useLanguage();
  const t = (en: string, ru: string) => language === "ru" ? ru : en;
  const { data: user, isLoading } = useSession();
  const logout = useLogout();

  if (isLoading) return <div className="min-h-screen grid place-items-center text-sm text-muted-foreground">Loading…</div>;
  if (!user) return <Navigate to="/seller-login" replace />;
  if (user.role !== "seller" && user.role !== "admin") return <Navigate to="/seller-login" replace />;

  const nav = [
    { to: "/seller", icon: LayoutDashboard, label: t("Dashboard", "Dashboard") },
    { to: "/seller/inventory", icon: Package, label: t("Inventory", "Inventory") },
    { to: "/seller/orders", icon: ShoppingBag, label: t("Orders", "Orders") },
    { to: "/seller/payouts", icon: Wallet, label: t("Payouts", "Payouts") },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <div className="flex-1 container py-6">
        <div className="grid lg:grid-cols-[220px_1fr] gap-6">
          <aside className="bg-card border border-border rounded-2xl p-3 h-fit lg:sticky lg:top-24">
            <div className="px-3 py-2 mb-2"><p className="text-xs text-muted-foreground">{t("Logged in as", "Login")}</p><p className="font-bold text-sm truncate">{user.name || user.phone}</p></div>
            <nav className="space-y-1">
              {nav.map(n => {
                const active = pathname === n.to;
                return (
                  <Link key={n.to} to={n.to} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary hover:text-foreground"}`}>
                    <n.icon className="h-4 w-4" />{n.label}
                  </Link>
                );
              })}
              <button onClick={async () => { await logout.mutateAsync(); window.location.href = "/"; }} className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold text-destructive hover:bg-destructive/5">
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
    </div>
  );
}

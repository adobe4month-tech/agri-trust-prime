import { Link, useLocation, Navigate } from "react-router-dom";
import { ReactNode } from "react";
import {
  LayoutDashboard, ShoppingBag, Package, FolderTree, Users, UserCog,
  Ticket, Coins, FileText, MessageSquare, Inbox, Megaphone, Settings, History, LogOut, Shield,
} from "lucide-react";
import { useSession, useLogout } from "@/hooks/api";

const nav = [
  { to: "/admin", icon: LayoutDashboard, label: "Dashboard", end: true },
  { to: "/admin/orders", icon: ShoppingBag, label: "Orders" },
  { to: "/admin/products", icon: Package, label: "Products" },
  { to: "/admin/taxonomy", icon: FolderTree, label: "Categories & Crops" },
  { to: "/admin/sellers", icon: UserCog, label: "Sellers" },
  { to: "/admin/customers", icon: Users, label: "Customers" },
  { to: "/admin/coupons", icon: Ticket, label: "Coupons" },
  { to: "/admin/loyalty", icon: Coins, label: "Loyalty" },
  { to: "/admin/content", icon: FileText, label: "Content" },
  { to: "/admin/reviews", icon: MessageSquare, label: "Reviews & Q&A" },
  { to: "/admin/leads", icon: Inbox, label: "Leads" },
  { to: "/admin/notifications", icon: Megaphone, label: "Notifications" },
  { to: "/admin/settings", icon: Settings, label: "Settings" },
  { to: "/admin/audit", icon: History, label: "Audit log" },
];

export default function AdminLayout({ children, title, subtitle }: { children: ReactNode; title: string; subtitle?: string }) {
  const { pathname } = useLocation();
  const { data: user, isLoading } = useSession();
  const logout = useLogout();

  if (isLoading) return <div className="min-h-screen grid place-items-center text-sm text-muted-foreground">Loading…</div>;
  if (!user) return <Navigate to="/admin-login" replace />;
  if (user.role !== "admin") return <Navigate to="/" replace />;

  return (
    <div className="min-h-screen bg-secondary/30 flex">
      <aside className="hidden lg:flex w-60 flex-col bg-card border-r border-border">
        <div className="px-4 py-4 border-b border-border flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary/10 grid place-items-center"><Shield className="h-4 w-4 text-primary" /></div>
          <div className="min-w-0">
            <p className="font-extrabold text-sm leading-tight">KissanCares</p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Admin Panel</p>
          </div>
        </div>
        <nav className="flex-1 overflow-y-auto p-2 space-y-0.5">
          {nav.map(n => {
            const active = n.end ? pathname === n.to : pathname.startsWith(n.to);
            return (
              <Link key={n.to} to={n.to} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary hover:text-foreground"}`}>
                <n.icon className="h-4 w-4" />{n.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-2 border-t border-border">
          <div className="px-3 py-2 mb-1">
            <p className="text-[10px] text-muted-foreground uppercase">Signed in</p>
            <p className="font-bold text-xs truncate">{user.name || user.phone}</p>
          </div>
          <button onClick={async () => { await logout.mutateAsync(); window.location.href = "/"; }} className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold text-destructive hover:bg-destructive/5">
            <LogOut className="h-4 w-4" />Logout
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-card border-b border-border px-4 lg:px-6 py-3 flex items-center justify-between gap-3 sticky top-0 z-10">
          <div className="min-w-0">
            <h1 className="text-lg lg:text-xl font-extrabold truncate">{title}</h1>
            {subtitle && <p className="text-xs text-muted-foreground truncate">{subtitle}</p>}
          </div>
          <div className="flex items-center gap-2">
            <Link to="/" className="text-xs font-semibold text-primary hover:underline hidden sm:inline">View site →</Link>
          </div>
        </header>
        {/* Mobile nav */}
        <div className="lg:hidden border-b border-border bg-card overflow-x-auto">
          <nav className="flex gap-1 p-2 min-w-max">
            {nav.map(n => {
              const active = n.end ? pathname === n.to : pathname.startsWith(n.to);
              return (
                <Link key={n.to} to={n.to} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold shrink-0 ${active ? "bg-primary text-primary-foreground" : "text-muted-foreground bg-secondary"}`}>
                  <n.icon className="h-3.5 w-3.5" />{n.label}
                </Link>
              );
            })}
          </nav>
        </div>
        <main className="flex-1 p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}

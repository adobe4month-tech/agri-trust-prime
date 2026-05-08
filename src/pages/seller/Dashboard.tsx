import SellerLayout from "@/components/seller/SellerLayout";
import { useLanguage } from "@/contexts/LanguageContext";
import { products } from "@/data/mockData";
import { TrendingUp, ShoppingBag, Package, Wallet, ArrowUpRight } from "lucide-react";

export default function SellerDashboard() {
  const { language } = useLanguage();
  const t = (en: string, ru: string) => language === "ru" ? ru : en;
  const top = [...products].sort((a, b) => b.soldCount - a.soldCount).slice(0, 5);
  const stats = [
    { icon: ShoppingBag, label: t("Orders (30d)", "Orders (30d)"), value: "284", change: "+12%" },
    { icon: TrendingUp, label: t("Revenue (30d)", "Revenue (30d)"), value: "Rs.4.2L", change: "+18%" },
    { icon: Package, label: t("Active SKUs", "Active SKUs"), value: products.length.toString(), change: "+3" },
    { icon: Wallet, label: t("Pending Payout", "Pending Payout"), value: "Rs.1.8L", change: "" },
  ];

  return (
    <SellerLayout title={t("Dashboard", "Dashboard")}>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {stats.map(s => (
          <div key={s.label} className="premium-card p-4">
            <s.icon className="h-5 w-5 text-primary mb-2" />
            <p className="text-xs text-muted-foreground">{s.label}</p>
            <p className="text-xl font-extrabold">{s.value}</p>
            {s.change && <p className="text-[11px] text-primary font-bold flex items-center gap-0.5 mt-0.5"><ArrowUpRight className="h-3 w-3" />{s.change}</p>}
          </div>
        ))}
      </div>

      <div className="premium-card p-5 mb-6">
        <h2 className="font-extrabold mb-3">{t("Top Selling Products", "Sab Se Zyada Bikne Wale")}</h2>
        <div className="divide-y divide-border">
          {top.map((p, i) => (
            <div key={p.id} className="flex items-center gap-3 py-3">
              <span className="w-6 text-xs font-bold text-muted-foreground">{i + 1}</span>
              <img src={p.image} alt="" className="w-10 h-10 rounded bg-secondary/40 object-contain p-1" />
              <div className="flex-1 min-w-0"><p className="text-sm font-semibold truncate">{p.name}</p><p className="text-xs text-muted-foreground">{p.brand}</p></div>
              <div className="text-right"><p className="text-sm font-bold">{p.soldCount}</p><p className="text-[10px] text-muted-foreground">{t("sold", "biks")}</p></div>
            </div>
          ))}
        </div>
      </div>

      <div className="premium-card p-5">
        <h2 className="font-extrabold mb-3">{t("Recent Orders", "Halia Orders")}</h2>
        <div className="space-y-2">
          {[
            { id: "KC-2847", buyer: "Ali R.", amt: 1450, status: "Shipped" },
            { id: "KC-2846", buyer: "Hassan K.", amt: 3200, status: "Processing" },
            { id: "KC-2845", buyer: "Imran B.", amt: 875, status: "Delivered" },
          ].map(o => (
            <div key={o.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
              <div><p className="text-sm font-bold">{o.id}</p><p className="text-xs text-muted-foreground">{o.buyer}</p></div>
              <div className="text-right"><p className="text-sm font-extrabold">Rs.{o.amt.toLocaleString()}</p><p className="text-[10px] text-primary">{o.status}</p></div>
            </div>
          ))}
        </div>
      </div>
    </SellerLayout>
  );
}

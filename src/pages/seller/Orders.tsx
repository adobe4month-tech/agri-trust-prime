import { useState } from "react";
import SellerLayout from "@/components/seller/SellerLayout";
import { useLanguage } from "@/contexts/LanguageContext";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const mock = [
  { id: "KC-2847", buyer: "Ali R.", city: "Multan", amt: 1450, status: "Shipped", date: "2026-05-08" },
  { id: "KC-2846", buyer: "Hassan K.", city: "Faisalabad", amt: 3200, status: "Processing", date: "2026-05-08" },
  { id: "KC-2845", buyer: "Imran B.", city: "Sahiwal", amt: 875, status: "Delivered", date: "2026-05-07" },
  { id: "KC-2844", buyer: "Adeel S.", city: "Lahore", amt: 6700, status: "Delivered", date: "2026-05-07" },
  { id: "KC-2843", buyer: "Tariq M.", city: "Sargodha", amt: 2100, status: "Cancelled", date: "2026-05-06" },
];

export default function SellerOrders() {
  const { language } = useLanguage();
  const t = (en: string, ru: string) => language === "ru" ? ru : en;
  const [tab, setTab] = useState("all");

  const filtered = tab === "all" ? mock : mock.filter(o => o.status.toLowerCase() === tab);

  return (
    <SellerLayout title={t("Orders", "Orders")}>
      <Tabs value={tab} onValueChange={setTab} className="mb-4">
        <TabsList>
          <TabsTrigger value="all">{t("All", "Sab")}</TabsTrigger>
          <TabsTrigger value="processing">{t("Processing", "Processing")}</TabsTrigger>
          <TabsTrigger value="shipped">{t("Shipped", "Shipped")}</TabsTrigger>
          <TabsTrigger value="delivered">{t("Delivered", "Delivered")}</TabsTrigger>
          <TabsTrigger value="cancelled">{t("Cancelled", "Cancelled")}</TabsTrigger>
        </TabsList>
      </Tabs>
      <div className="premium-card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-secondary/40 text-xs font-extrabold uppercase tracking-wider text-muted-foreground">
            <tr><th className="text-left px-4 py-2">Order</th><th className="text-left px-4 py-2">Buyer</th><th className="text-left px-4 py-2 hidden sm:table-cell">City</th><th className="text-right px-4 py-2">Amount</th><th className="text-center px-4 py-2">Status</th></tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtered.map(o => (
              <tr key={o.id}>
                <td className="px-4 py-2 text-xs font-bold">{o.id}<p className="text-[10px] text-muted-foreground font-normal">{o.date}</p></td>
                <td className="px-4 py-2 text-xs">{o.buyer}</td>
                <td className="px-4 py-2 text-xs text-muted-foreground hidden sm:table-cell">{o.city}</td>
                <td className="px-4 py-2 text-xs text-right font-extrabold">Rs.{o.amt.toLocaleString()}</td>
                <td className="px-4 py-2 text-center"><Badge variant="secondary" className="text-[10px]">{o.status}</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SellerLayout>
  );
}

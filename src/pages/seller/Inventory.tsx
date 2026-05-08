import { useState } from "react";
import SellerLayout from "@/components/seller/SellerLayout";
import { useLanguage } from "@/contexts/LanguageContext";
import { products as initial } from "@/data/mockData";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Search } from "lucide-react";

export default function SellerInventory() {
  const { language } = useLanguage();
  const t = (en: string, ru: string) => language === "ru" ? ru : en;
  const [q, setQ] = useState("");
  const [stock, setStock] = useState<Record<number, number>>(() => Object.fromEntries(initial.map(p => [p.id, p.stockCount])));

  const list = initial.filter(p => p.name.toLowerCase().includes(q.toLowerCase()));

  return (
    <SellerLayout title={t("Inventory", "Inventory")}>
      <div className="relative mb-4 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder={t("Search products...", "Products dhoondein...")} value={q} onChange={e => setQ(e.target.value)} className="pl-9" />
      </div>
      <div className="premium-card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-secondary/40">
            <tr>
              <th className="text-left px-4 py-2 text-xs font-extrabold uppercase tracking-wider text-muted-foreground">{t("Product", "Product")}</th>
              <th className="text-left px-4 py-2 text-xs font-extrabold uppercase tracking-wider text-muted-foreground">{t("Brand", "Brand")}</th>
              <th className="text-right px-4 py-2 text-xs font-extrabold uppercase tracking-wider text-muted-foreground">{t("Price", "Qeemat")}</th>
              <th className="text-right px-4 py-2 text-xs font-extrabold uppercase tracking-wider text-muted-foreground">{t("Stock", "Stock")}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {list.map(p => {
              const s = stock[p.id];
              return (
                <tr key={p.id}>
                  <td className="px-4 py-2"><div className="flex items-center gap-2"><img src={p.image} alt="" className="w-8 h-8 rounded object-contain bg-secondary/30 p-1" /><span className="text-xs font-semibold truncate max-w-[200px]">{p.name}</span></div></td>
                  <td className="px-4 py-2 text-xs text-muted-foreground">{p.brand}</td>
                  <td className="px-4 py-2 text-right text-xs font-bold">Rs.{p.price.toLocaleString()}</td>
                  <td className="px-4 py-2 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {s <= 15 && <Badge variant="secondary" className="bg-sale/10 text-sale border-sale/20 text-[10px]"><AlertTriangle className="h-2.5 w-2.5 mr-0.5" />{t("Low", "Kam")}</Badge>}
                      <Input type="number" value={s} onChange={e => setStock(st => ({ ...st, [p.id]: Number(e.target.value) }))} className="w-20 h-8 text-xs text-right" />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </SellerLayout>
  );
}

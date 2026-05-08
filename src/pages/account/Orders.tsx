import { Link } from "react-router-dom";
import AccountLayout from "@/components/account/AccountLayout";
import InvoiceButton from "@/components/InvoiceButton";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCart } from "@/contexts/CartContext";
import { products } from "@/data/mockData";
import { RotateCcw, MapPin, ShoppingBag } from "lucide-react";
import { toast } from "sonner";

const mockOrders = [
  { id: "KC-2847", date: "2026-05-08", status: "Shipped", items: [301, 302], total: 2325 },
  { id: "KC-2811", date: "2026-04-22", status: "Delivered", items: [305], total: 1250 },
  { id: "KC-2790", date: "2026-04-10", status: "Delivered", items: [301, 305], total: 2125 },
];

export default function AccountOrders() {
  const { language } = useLanguage();
  const { addToCart } = useCart();
  const t = (en: string, ru: string) => language === "ru" ? ru : en;

  const reorder = (ids: number[]) => {
    ids.forEach(id => { const p = products.find(x => x.id === id); if (p) addToCart(p); });
    toast.success(t("Items added to cart", "Items cart mein"));
  };

  return (
    <AccountLayout title={t("My Orders", "Mere Orders")}>
      {mockOrders.length === 0 ? (
        <p className="text-sm text-muted-foreground">{t("No orders yet.", "Abhi koi order nahi.")}</p>
      ) : (
        <div className="space-y-3">
          {mockOrders.map(o => {
            const orderItems = o.items.map(id => products.find(p => p.id === id)).filter(Boolean) as typeof products;
            return (
              <div key={o.id} className="premium-card p-4">
                <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
                  <div>
                    <p className="font-extrabold">{o.id}</p>
                    <p className="text-xs text-muted-foreground">{o.date}</p>
                  </div>
                  <Badge variant="secondary" className="text-[10px]">{o.status}</Badge>
                </div>
                <div className="flex gap-2 mb-3 overflow-x-auto">
                  {orderItems.map(p => (
                    <img key={p!.id} src={p!.image} alt="" className="w-12 h-12 rounded bg-secondary/30 object-contain p-1 shrink-0" />
                  ))}
                </div>
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <p className="font-extrabold">Rs.{o.total.toLocaleString()}</p>
                  <div className="flex gap-2 flex-wrap">
                    <Button size="sm" variant="outline" onClick={() => reorder(o.items)}><RotateCcw className="h-3 w-3" />{t("Reorder", "Phir Order")}</Button>
                    <Button size="sm" variant="outline" asChild><Link to="/track"><MapPin className="h-3 w-3" />{t("Track", "Track")}</Link></Button>
                    <Button size="sm" variant="outline" asChild><Link to="/return-request"><RotateCcw className="h-3 w-3" />{t("Return", "Return")}</Link></Button>
                    <InvoiceButton data={{
                      orderId: o.id, date: o.date,
                      buyer: { name: localStorage.getItem("kc-user-phone") || "Customer", phone: localStorage.getItem("kc-user-phone") || "", address: "Saved address", city: "—" },
                      items: orderItems.map(p => ({ name: p!.name, qty: 1, price: p!.price })),
                      subtotal: o.total, shipping: 0, total: o.total,
                    }} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      <div className="mt-6">
        <Button asChild variant="hero"><Link to="/products"><ShoppingBag className="h-4 w-4" />{t("Continue Shopping", "Khareedari Jari")}</Link></Button>
      </div>
    </AccountLayout>
  );
}

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { CheckCircle2, MessageCircle, Truck, Undo2 } from "lucide-react";
import InvoiceButton from "@/components/InvoiceButton";

export default function OrderSuccess() {
  const { language } = useLanguage();
  const t = (en: string, ru: string) => (language === "ru" ? ru : en);
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    try { setOrder(JSON.parse(sessionStorage.getItem("kc-last-order") || "null")); } catch {}
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead title="Order Confirmed — KissanCares" description="Your order has been placed successfully." />
      <Header />
      <main className="max-w-2xl mx-auto px-4 py-12 text-center">
        <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-6">
          <CheckCircle2 className="h-12 w-12 text-primary" />
        </div>
        <h1 className="text-3xl font-extrabold mb-2">{t("Order Placed!", "Order Mukammal!")}</h1>
        <p className="text-muted-foreground mb-6">{t("Shukriya! Our team will confirm your order on WhatsApp shortly.", "Shukriya! Hamari team WhatsApp par jald confirm karegi.")}</p>

        {order && (
          <div className="bg-card border border-border rounded-2xl p-6 text-left space-y-3 mb-6">
            <div className="flex justify-between"><span className="text-muted-foreground">{t("Order ID", "Order ID")}</span><span className="font-bold">{order.orderId}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">{t("Total", "Total")}</span><span className="font-extrabold">Rs.{order.totalPrice.toLocaleString()}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">{t("Delivery to", "Delivery")}</span><span className="font-semibold">{order.form.city}</span></div>
            <div className="flex items-center gap-2 text-sm text-primary pt-2 border-t border-border">
              <Truck className="h-4 w-4" />{t("Estimated 2–4 working days", "2–4 din mein delivery")}
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild variant="hero"><a href="https://wa.me/923240287276" target="_blank" rel="noreferrer"><MessageCircle className="h-4 w-4" />{t("Chat on WhatsApp", "WhatsApp Par Baat")}</a></Button>
          <Button asChild variant="outline"><Link to="/">{t("Back to Home", "Wapis Home")}</Link></Button>
        </div>
      </main>
      <Footer />
    </div>
  );
}

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCart } from "@/contexts/CartContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { MessageCircle, Truck, ShieldCheck, BadgeCheck } from "lucide-react";

export default function Checkout() {
  const { items, totalPrice, clearCart } = useCart();
  const { language } = useLanguage();
  const navigate = useNavigate();
  const t = (en: string, ru: string) => (language === "ru" ? ru : en);

  const [form, setForm] = useState({ name: "", phone: "", address: "", city: "", province: "Punjab", notes: "" });
  const [payment, setPayment] = useState("cod");

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const orderId = "KC-" + Date.now().toString().slice(-8);
    const lines = items.map(i => `• ${i.product.name} x${i.qty} = Rs.${(i.product.price * i.qty).toLocaleString()}`).join("\n");
    const msg = encodeURIComponent(
      `Assalam o Alaikum! New Order #${orderId}\n\nName: ${form.name}\nPhone: ${form.phone}\nAddress: ${form.address}, ${form.city}, ${form.province}\n\n${lines}\n\nTotal: Rs.${totalPrice.toLocaleString()}\nPayment: ${payment === "cod" ? "Cash on Delivery" : "Bank Transfer"}\n\nNotes: ${form.notes || "—"}`
    );
    sessionStorage.setItem("kc-last-order", JSON.stringify({ orderId, form, items, totalPrice, payment }));
    window.open(`https://wa.me/923240287276?text=${msg}`, "_blank");
    clearCart();
    navigate("/order-success");
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="max-w-2xl mx-auto px-4 py-20 text-center">
          <p className="text-muted-foreground mb-4">{t("Your cart is empty", "Cart khaali hai")}</p>
          <Button asChild variant="hero"><Link to="/products">{t("Browse Products", "Products Dekhein")}</Link></Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SEOHead title="Checkout — KissanCares" description="Secure COD checkout with WhatsApp confirmation." />
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-extrabold mb-6">{t("Checkout", "Checkout")}</h1>
        <form onSubmit={handlePlaceOrder} className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <section className="bg-card border border-border rounded-2xl p-5 space-y-4">
              <h2 className="font-bold">{t("Delivery Address", "Delivery Pata")}</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                <div><Label>{t("Full Name", "Pura Naam")}</Label><Input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></div>
                <div><Label>{t("Phone (WhatsApp)", "Phone (WhatsApp)")}</Label><Input required type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} /></div>
              </div>
              <div><Label>{t("Address", "Pata")}</Label><Input required value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} /></div>
              <div className="grid sm:grid-cols-2 gap-3">
                <div><Label>{t("City", "Sheher")}</Label><Input required value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} /></div>
                <div><Label>{t("Province", "Suba")}</Label><Input required value={form.province} onChange={e => setForm({ ...form, province: e.target.value })} /></div>
              </div>
              <div><Label>{t("Order Notes (optional)", "Order Notes")}</Label><Input value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} /></div>
            </section>

            <section className="bg-card border border-border rounded-2xl p-5 space-y-3">
              <h2 className="font-bold">{t("Payment Method", "Payment ka Tareeqa")}</h2>
              <RadioGroup value={payment} onValueChange={setPayment}>
                <label className="flex items-start gap-3 p-3 border border-border rounded-xl cursor-pointer hover:bg-secondary/30">
                  <RadioGroupItem value="cod" id="cod" className="mt-1" />
                  <div><p className="font-semibold">{t("Cash on Delivery", "Cash on Delivery")}</p><p className="text-xs text-muted-foreground">{t("Pay when you receive your order", "Order milne par paise dein")}</p></div>
                </label>
                <label className="flex items-start gap-3 p-3 border border-border rounded-xl cursor-pointer hover:bg-secondary/30">
                  <RadioGroupItem value="bank" id="bank" className="mt-1" />
                  <div><p className="font-semibold">{t("Bank Transfer", "Bank Transfer")}</p><p className="text-xs text-muted-foreground">{t("Account details sent via WhatsApp", "Account details WhatsApp par milein gi")}</p></div>
                </label>
              </RadioGroup>
            </section>

            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><ShieldCheck className="h-4 w-4 text-primary" />{t("100% Original", "Asli Products")}</span>
              <span className="flex items-center gap-1"><Truck className="h-4 w-4 text-primary" />{t("Nationwide Delivery", "Pakistan Bhar Delivery")}</span>
              <span className="flex items-center gap-1"><BadgeCheck className="h-4 w-4 text-primary" />{t("Agronomist Verified", "Agronomist Verified")}</span>
            </div>
          </div>

          <aside className="bg-card border border-border rounded-2xl p-5 h-fit space-y-3 sticky top-24">
            <h2 className="font-bold">{t("Order Summary", "Order Tafseel")}</h2>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {items.map(i => (
                <div key={i.product.id} className="flex justify-between text-sm">
                  <span className="line-clamp-1 mr-2">{i.product.name} x{i.qty}</span>
                  <span className="font-semibold whitespace-nowrap">Rs.{(i.product.price * i.qty).toLocaleString()}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-border pt-3 flex justify-between font-extrabold text-lg"><span>{t("Total", "Total")}</span><span>Rs.{totalPrice.toLocaleString()}</span></div>
            <Button type="submit" variant="hero" size="lg" className="w-full"><MessageCircle className="h-4 w-4" />{t("Confirm via WhatsApp", "WhatsApp Par Confirm Karein")}</Button>
            <p className="text-[10px] text-muted-foreground text-center">{t("By placing this order you agree to our Terms & Privacy.", "Order karne se aap shara'it se mutfaq hain.")}</p>
          </aside>
        </form>
      </main>
      <Footer />
    </div>
  );
}

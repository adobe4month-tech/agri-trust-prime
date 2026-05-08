import { useEffect, useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { MessageCircle, X, ShoppingBag } from "lucide-react";

export default function AbandonedCartNudge() {
  const { items, totalPrice } = useCart();
  const { language } = useLanguage();
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (items.length === 0 || dismissed) return;
    const lastSeen = Number(localStorage.getItem("kc-cart-seen") || 0);
    const hoursAway = (Date.now() - lastSeen) / 36e5;
    if (lastSeen && hoursAway > 1) setShow(true);

    const idleTimer = setTimeout(() => setShow(true), 90_000);
    const onActivity = () => localStorage.setItem("kc-cart-seen", String(Date.now()));
    window.addEventListener("beforeunload", onActivity);
    onActivity();
    return () => { clearTimeout(idleTimer); window.removeEventListener("beforeunload", onActivity); };
  }, [items.length, dismissed]);

  if (!show || items.length === 0 || dismissed) return null;

  const msg = encodeURIComponent(
    `Salaam! Mera cart wait kar raha hai (${items.length} items, Rs.${totalPrice.toLocaleString()}). Code WAPSI5 use karke 5% off lagayein.\n\n` +
    items.map(i => `• ${i.product.name} x${i.qty}`).join("\n")
  );

  return (
    <div className="fixed bottom-24 right-4 z-40 max-w-xs bg-card border-2 border-primary/30 rounded-2xl shadow-2xl p-4 animate-fade-in">
      <button onClick={() => setDismissed(true)} className="absolute top-2 right-2 text-muted-foreground hover:text-foreground"><X className="h-4 w-4" /></button>
      <div className="flex items-center gap-2 mb-2">
        <div className="w-9 h-9 rounded-full bg-sale/10 flex items-center justify-center"><ShoppingBag className="h-4 w-4 text-sale" /></div>
        <p className="font-extrabold text-sm">{language === "ru" ? "Aapka Cart Wait Kar Raha Hai!" : "Your Cart Is Waiting!"}</p>
      </div>
      <p className="text-xs text-muted-foreground mb-3">
        {language === "ru" ? `${items.length} items · 5% off code: ` : `${items.length} items · 5% off code: `}
        <span className="font-bold text-primary">WAPSI5</span>
      </p>
      <Button asChild variant="whatsapp" size="sm" className="w-full">
        <a href={`https://wa.me/923240287276?text=${msg}`} target="_blank" rel="noreferrer">
          <MessageCircle className="h-4 w-4" />{language === "ru" ? "WhatsApp Pe Mukammal Karein" : "Complete on WhatsApp"}
        </a>
      </Button>
    </div>
  );
}

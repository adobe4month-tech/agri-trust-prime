import { useEffect, useState } from "react";
import { ShoppingCart, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Product } from "@/data/mockData";

interface Props {
  product: Product;
  onAddToCart: () => void;
  triggerSelector?: string;
}

export default function StickyPDPBar({ product, onAddToCart, triggerSelector = "#pdp-main-cta" }: Props) {
  const { language, t } = useLanguage();
  const [visible, setVisible] = useState(false);
  const isSoldOut = product.stockStatus === "sold-out" || product.stockStatus === "coming-soon";

  useEffect(() => {
    const target = document.querySelector(triggerSelector);
    if (!target) {
      // Fallback: show after scrolling 400px
      const onScroll = () => setVisible(window.scrollY > 400);
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    }
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, [triggerSelector]);

  const notifyMsg = encodeURIComponent(
    language === "ru"
      ? `Salaam! Mujhe ${product.nameUrdu} stock mein aane par WhatsApp par batayein.`
      : `Hello! Please notify me when ${product.name} is back in stock.`
  );

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-card/95 backdrop-blur-md border-t border-border shadow-2xl transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="flex items-center gap-3 p-3">
        <img src={product.image} alt="" className="w-12 h-12 rounded-lg object-contain bg-secondary/50 shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-foreground truncate">
            {language === "ru" ? product.nameUrdu : product.name}
          </p>
          <p className="text-base font-extrabold text-primary leading-tight">Rs.{product.price.toLocaleString()}</p>
        </div>
        {isSoldOut ? (
          <Button asChild variant="whatsapp" size="sm" className="text-xs shrink-0">
            <a href={`https://wa.me/923240287276?text=${notifyMsg}`} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-3.5 w-3.5" />
              {language === "ru" ? "Notify" : "Notify"}
            </a>
          </Button>
        ) : (
          <Button variant="default" size="sm" onClick={onAddToCart} className="text-xs shrink-0">
            <ShoppingCart className="h-3.5 w-3.5" />
            {t("product.addToCart")}
          </Button>
        )}
      </div>
    </div>
  );
}

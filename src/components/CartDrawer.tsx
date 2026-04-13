import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { ShoppingCart, Trash2, Plus, Minus, MessageCircle, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

interface CartDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CartDrawer({ open, onOpenChange }: CartDrawerProps) {
  const { items, removeFromCart, updateQty, totalItems, totalPrice, clearCart } = useCart();
  const { language } = useLanguage();
  const [showPreview, setShowPreview] = useState(false);

  const buildWhatsAppMessage = () => {
    const itemLines = items.map(i => `• ${i.product.name} x${i.qty} = Rs.${(i.product.price * i.qty).toLocaleString()}`).join("\n");
    return `Assalam o Alaikum! I want to order:\n\n${itemLines}\n\nTotal: Rs.${totalPrice.toLocaleString()}\n\nPlease confirm.`;
  };

  const handleWhatsAppCheckout = () => {
    const msg = encodeURIComponent(buildWhatsAppMessage());
    window.open(`https://wa.me/923240287276?text=${msg}`, "_blank");
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md bg-card flex flex-col">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2 text-foreground">
            <ShoppingCart className="h-5 w-5" />
            {language === "ru" ? "Aapki Cart" : "Your Cart"} ({totalItems})
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center gap-4">
            <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center">
              <ShoppingCart className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground text-sm font-medium">
              {language === "ru" ? "Cart khaali hai" : "Your cart is empty"}
            </p>
            <Button variant="default" onClick={() => onOpenChange(false)}>
              {language === "ru" ? "Products Dekhein" : "Browse Products"}
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto space-y-3 py-4">
              {items.map(item => (
                <div key={item.product.id} className="flex gap-3 p-3 rounded-xl bg-secondary/30 border border-border/50">
                  <img src={item.product.image} alt={item.product.name} className="w-16 h-16 object-contain rounded-lg bg-card" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-foreground line-clamp-1">
                      {language === "ru" ? item.product.nameUrdu : item.product.name}
                    </p>
                    <p className="text-xs text-muted-foreground">{item.product.brand}</p>
                    <p className="text-sm font-extrabold text-foreground mt-1">Rs.{item.product.price.toLocaleString()}</p>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <button onClick={() => removeFromCart(item.product.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                      <Trash2 className="h-4 w-4" />
                    </button>
                    <div className="flex items-center gap-1 border border-border rounded-lg overflow-hidden">
                      <button onClick={() => updateQty(item.product.id, item.qty - 1)} className="px-2 py-1 hover:bg-secondary transition-colors">
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="px-2 text-xs font-bold text-foreground">{item.qty}</span>
                      <button onClick={() => updateQty(item.product.id, item.qty + 1)} className="px-2 py-1 hover:bg-secondary transition-colors">
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-border pt-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-muted-foreground">
                  {language === "ru" ? "Kul Qeemat" : "Subtotal"}
                </span>
                <span className="text-xl font-extrabold text-foreground">Rs.{totalPrice.toLocaleString()}</span>
              </div>

              {/* WhatsApp Message Preview */}
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
              >
                {showPreview ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                {language === "ru" ? "WhatsApp message dekhein" : "Preview WhatsApp message"}
              </button>
              {showPreview && (
                <div className="bg-[hsl(142,40%,95%)] border border-[hsl(142,40%,85%)] rounded-lg p-3 text-xs text-foreground whitespace-pre-wrap font-mono leading-relaxed max-h-32 overflow-y-auto">
                  {buildWhatsAppMessage()}
                </div>
              )}

              <Button variant="hero" size="lg" className="w-full" onClick={handleWhatsAppCheckout}>
                <MessageCircle className="h-4 w-4" />
                {language === "ru" ? "WhatsApp Par Order Karein" : "Checkout via WhatsApp"}
              </Button>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1" onClick={() => onOpenChange(false)}>
                  {language === "ru" ? "Aur Khareedein" : "Continue Shopping"}
                </Button>
                <Button variant="ghost" size="sm" onClick={clearCart} className="text-destructive hover:text-destructive">
                  {language === "ru" ? "Cart Saaf Karein" : "Clear Cart"}
                </Button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

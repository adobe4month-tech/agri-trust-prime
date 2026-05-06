import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";

export default function Cart() {
  const { items, removeFromCart, updateQty, totalItems, totalPrice, clearCart } = useCart();
  const { language } = useLanguage();
  const t = (en: string, ru: string) => (language === "ru" ? ru : en);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead title="Cart — KissanCares" description="Review your selected agri-inputs before checkout." />
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-extrabold text-foreground mb-6">
          {t("Shopping Cart", "Aapki Cart")} ({totalItems})
        </h1>

        {items.length === 0 ? (
          <div className="text-center py-20">
            <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground mb-6">{t("Your cart is empty", "Cart khaali hai")}</p>
            <Button asChild variant="hero"><Link to="/products">{t("Browse Products", "Products Dekhein")}</Link></Button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-3">
              {items.map(item => (
                <div key={item.product.id} className="flex gap-4 p-4 bg-card border border-border rounded-2xl">
                  <img src={item.product.image} alt={item.product.name} className="w-24 h-24 object-contain rounded-lg bg-secondary/30" />
                  <div className="flex-1 min-w-0">
                    <Link to={`/product/${item.product.slug}`} className="font-bold text-foreground hover:text-primary line-clamp-2">
                      {language === "ru" ? item.product.nameUrdu : item.product.name}
                    </Link>
                    <p className="text-xs text-muted-foreground">{item.product.brand}</p>
                    <p className="font-extrabold text-foreground mt-2">Rs.{item.product.price.toLocaleString()}</p>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <button onClick={() => removeFromCart(item.product.id)} className="text-muted-foreground hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </button>
                    <div className="flex items-center border border-border rounded-lg overflow-hidden">
                      <button onClick={() => updateQty(item.product.id, item.qty - 1)} className="px-2 py-1 hover:bg-secondary"><Minus className="h-3 w-3" /></button>
                      <span className="px-3 text-sm font-bold">{item.qty}</span>
                      <button onClick={() => updateQty(item.product.id, item.qty + 1)} className="px-2 py-1 hover:bg-secondary"><Plus className="h-3 w-3" /></button>
                    </div>
                  </div>
                </div>
              ))}
              <Button variant="ghost" size="sm" onClick={clearCart} className="text-destructive">
                {t("Clear Cart", "Cart Saaf Karein")}
              </Button>
            </div>

            <aside className="bg-card border border-border rounded-2xl p-5 h-fit space-y-4 sticky top-24">
              <h2 className="font-bold text-foreground">{t("Order Summary", "Order Tafseel")}</h2>
              <div className="flex justify-between text-sm"><span>{t("Subtotal", "Kul")}</span><span className="font-bold">Rs.{totalPrice.toLocaleString()}</span></div>
              <div className="flex justify-between text-sm"><span>{t("Delivery", "Delivery")}</span><span className="text-primary font-semibold">{t("Calculated at checkout", "Checkout par")}</span></div>
              <div className="border-t border-border pt-3 flex justify-between text-lg font-extrabold"><span>{t("Total", "Total")}</span><span>Rs.{totalPrice.toLocaleString()}</span></div>
              <Button asChild variant="hero" size="lg" className="w-full"><Link to="/checkout">{t("Proceed to Checkout", "Checkout Karein")}</Link></Button>
              <Button asChild variant="outline" size="sm" className="w-full"><Link to="/products">{t("Continue Shopping", "Aur Khareedein")}</Link></Button>
            </aside>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

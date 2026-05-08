import { useMemo, useState } from "react";
import { products, type Product } from "@/data/mockData";
import { useCart } from "@/contexts/CartContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ShoppingCart, Plus } from "lucide-react";
import { toast } from "sonner";

export default function FrequentlyBoughtTogether({ product }: { product: Product }) {
  const { language } = useLanguage();
  const { addToCart } = useCart();
  const t = (en: string, ru: string) => language === "ru" ? ru : en;

  const suggestions = useMemo(() => {
    return products
      .filter(p => p.id !== product.id)
      .map(p => {
        let score = 0;
        if (p.category === product.category) score += 2;
        if (p.targetCrops?.some(c => product.targetCrops?.includes(c))) score += 5;
        return { p, score };
      })
      .filter(s => s.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 2)
      .map(s => s.p);
  }, [product]);

  const all = [product, ...suggestions];
  const [selected, setSelected] = useState<number[]>(all.map(p => p.id));
  const total = all.filter(p => selected.includes(p.id)).reduce((s, p) => s + p.price, 0);
  const bundleDiscount = selected.length === 3 ? Math.round(total * 0.07) : selected.length === 2 ? Math.round(total * 0.04) : 0;

  if (suggestions.length === 0) return null;

  const toggle = (id: number) => setSelected(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);

  const addAll = () => {
    all.filter(p => selected.includes(p.id)).forEach(p => addToCart(p));
    toast.success(t(`Added ${selected.length} items to cart`, `${selected.length} items cart mein daal diye`));
  };

  return (
    <section className="mt-12">
      <h2 className="text-lg md:text-xl font-extrabold text-foreground mb-4 flex items-center gap-2">
        <div className="w-1 h-6 rounded-full bg-gradient-to-b from-primary to-trust-green" />
        {t("Frequently Bought Together", "Aksar Saath Khareeda Jaata Hai")}
      </h2>
      <div className="premium-card p-5">
        <div className="flex items-start gap-3 overflow-x-auto pb-2">
          {all.map((p, i) => (
            <div key={p.id} className="flex items-center gap-3 shrink-0">
              <div className="w-32">
                <div className="aspect-square bg-secondary/30 rounded-lg overflow-hidden mb-2"><img src={p.image} alt="" className="w-full h-full object-contain p-2" /></div>
                <label className="flex items-start gap-2 cursor-pointer">
                  <Checkbox checked={selected.includes(p.id)} onCheckedChange={() => toggle(p.id)} className="mt-0.5" />
                  <div>
                    <p className="text-[11px] font-semibold leading-tight line-clamp-2">{language === "ru" ? p.nameUrdu : p.name}</p>
                    <p className="text-xs font-extrabold text-primary mt-1">Rs.{p.price.toLocaleString()}</p>
                  </div>
                </label>
              </div>
              {i < all.length - 1 && <Plus className="h-4 w-4 text-muted-foreground self-center" />}
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between gap-3 border-t border-border pt-4">
          <div>
            <p className="text-xs text-muted-foreground">{selected.length} {t("items selected", "items chune")}</p>
            <p className="text-xl font-extrabold">Rs.{(total - bundleDiscount).toLocaleString()}
              {bundleDiscount > 0 && <span className="text-xs text-muted-foreground line-through ml-2">Rs.{total.toLocaleString()}</span>}
            </p>
            {bundleDiscount > 0 && <p className="text-[11px] text-primary font-bold">{t(`Save Rs.${bundleDiscount} on bundle`, `Bundle par Rs.${bundleDiscount} bachat`)}</p>}
          </div>
          <Button variant="hero" onClick={addAll} disabled={selected.length === 0}><ShoppingCart className="h-4 w-4" />{t("Add Selected to Cart", "Cart Mein Daalein")}</Button>
        </div>
      </div>
    </section>
  );
}

import { useState, createContext, useContext, type ReactNode } from "react";
import { products, type Product } from "@/data/mockData";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { X, GitCompareArrows, Star } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface CompareContextType {
  compareIds: number[];
  toggleCompare: (id: number) => void;
  isComparing: (id: number) => boolean;
  clearCompare: () => void;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export function CompareProvider({ children }: { children: ReactNode }) {
  const [compareIds, setCompareIds] = useState<number[]>([]);

  const toggleCompare = (id: number) => {
    setCompareIds(prev => {
      if (prev.includes(id)) return prev.filter(x => x !== id);
      if (prev.length >= 3) return prev;
      return [...prev, id];
    });
  };

  return (
    <CompareContext.Provider value={{ compareIds, toggleCompare, isComparing: (id) => compareIds.includes(id), clearCompare: () => setCompareIds([]) }}>
      {children}
      <CompareBar />
    </CompareContext.Provider>
  );
}

export function useCompare() {
  const ctx = useContext(CompareContext);
  if (!ctx) throw new Error("useCompare must be used within CompareProvider");
  return ctx;
}

function CompareBar() {
  const { compareIds, clearCompare } = useCompare();
  const { language } = useLanguage();
  const [showDialog, setShowDialog] = useState(false);

  if (compareIds.length < 2) return null;

  const compareProducts = compareIds.map(id => products.find(p => p.id === id)).filter(Boolean) as Product[];

  return (
    <>
      <div className="fixed bottom-16 lg:bottom-0 left-0 right-0 z-50 bg-card border-t border-border shadow-lg px-4 py-3">
        <div className="container flex items-center justify-between">
          <div className="flex items-center gap-3">
            <GitCompareArrows className="h-5 w-5 text-primary" />
            <span className="text-sm font-bold text-foreground">
              {compareIds.length} {language === "ru" ? "products compare ke liye" : "products to compare"}
            </span>
            <div className="flex gap-2">
              {compareProducts.map(p => (
                <div key={p.id} className="w-10 h-10 rounded-lg bg-secondary overflow-hidden border border-border">
                  <img src={p.image} alt={p.name} className="w-full h-full object-contain p-1" />
                </div>
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="default" onClick={() => setShowDialog(true)}>
              <GitCompareArrows className="h-3.5 w-3.5" /> {language === "ru" ? "Compare Karein" : "Compare Now"}
            </Button>
            <Button size="sm" variant="ghost" onClick={clearCompare}>
              <X className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </div>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <GitCompareArrows className="h-5 w-5 text-primary" />
              {language === "ru" ? "Product Comparison" : "Product Comparison"}
            </DialogTitle>
          </DialogHeader>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className="text-left p-3 text-xs text-muted-foreground font-semibold uppercase tracking-wider w-32">{language === "ru" ? "Feature" : "Feature"}</th>
                  {compareProducts.map(p => (
                    <th key={p.id} className="p-3 text-center">
                      <img src={p.image} alt={p.name} className="w-16 h-16 object-contain mx-auto mb-2" />
                      <p className="text-xs font-bold text-foreground line-clamp-2">{language === "ru" ? p.nameUrdu : p.name}</p>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  { label: language === "ru" ? "Qeemat" : "Price", getValue: (p: Product) => `Rs.${p.price.toLocaleString()}` },
                  { label: "Brand", getValue: (p: Product) => p.brand },
                  { label: language === "ru" ? "Rating" : "Rating", getValue: (p: Product) => `${p.rating} ⭐ (${p.reviewCount})` },
                  { label: language === "ru" ? "Active Ingredient" : "Active Ingredient", getValue: (p: Product) => p.activeIngredient || "—" },
                  { label: language === "ru" ? "Dosage / Acre" : "Dosage / Acre", getValue: (p: Product) => p.dosagePerAcre || "—" },
                  { label: language === "ru" ? "Target Crops" : "Target Crops", getValue: (p: Product) => p.targetCrops?.join(", ") || "—" },
                  { label: language === "ru" ? "Free Delivery" : "Free Delivery", getValue: (p: Product) => p.freeDelivery ? "✅" : "❌" },
                  { label: language === "ru" ? "Bikay" : "Sold", getValue: (p: Product) => p.soldCount.toLocaleString() },
                ].map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-secondary/20" : ""}>
                    <td className="p-3 text-xs font-semibold text-muted-foreground">{row.label}</td>
                    {compareProducts.map(p => (
                      <td key={p.id} className="p-3 text-center text-xs font-medium text-foreground">{row.getValue(p)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

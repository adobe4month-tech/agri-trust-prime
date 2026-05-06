import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { useCompare } from "@/components/ProductCompare";
import { useLanguage } from "@/contexts/LanguageContext";
import { products } from "@/data/mockData";
import { Star, GitCompareArrows, X } from "lucide-react";

export default function Compare() {
  const { compareIds, toggleCompare, clearCompare } = useCompare();
  const { language } = useLanguage();
  const t = (en: string, ru: string) => (language === "ru" ? ru : en);
  const items = products.filter(p => compareIds.includes(p.id));

  const rows: { label: string; key: keyof typeof items[0] | "price" }[] = [
    { label: t("Price", "Qeemat"), key: "price" },
    { label: t("Brand", "Brand"), key: "brand" },
    { label: t("Active Ingredient", "Active Ingredient"), key: "activeIngredient" as any },
    { label: t("Dosage / Acre", "Dosage / Acre"), key: "dosagePerAcre" as any },
    { label: t("Application", "Application"), key: "applicationMethod" as any },
    { label: t("Rating", "Rating"), key: "rating" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead title="Compare Products — KissanCares" description="Side-by-side product comparison." />
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl md:text-3xl font-extrabold">{t("Compare Products", "Products Compare Karein")}</h1>
          {items.length > 0 && <Button variant="ghost" size="sm" onClick={clearCompare} className="text-destructive">{t("Clear", "Saaf")}</Button>}
        </div>

        {items.length === 0 ? (
          <div className="text-center py-20">
            <GitCompareArrows className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground mb-6">{t("Add up to 3 products to compare", "Compare ke liye 3 products add karein")}</p>
            <Button asChild variant="hero"><Link to="/products">{t("Browse Products", "Products Dekhein")}</Link></Button>
          </div>
        ) : (
          <div className="overflow-x-auto bg-card border border-border rounded-2xl">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="p-3 text-left font-semibold text-muted-foreground w-40">{t("Feature", "Feature")}</th>
                  {items.map(p => (
                    <th key={p.id} className="p-3 text-left min-w-[200px]">
                      <button onClick={() => toggleCompare(p.id)} className="float-right text-muted-foreground hover:text-destructive"><X className="h-4 w-4" /></button>
                      <Link to={`/product/${p.slug}`}>
                        <img src={p.image} alt={p.name} className="w-20 h-20 object-contain rounded-lg bg-secondary/30 mb-2" />
                        <p className="font-bold text-foreground line-clamp-2 hover:text-primary">{language === "ru" ? p.nameUrdu : p.name}</p>
                      </Link>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map(r => (
                  <tr key={r.label} className="border-b border-border last:border-0">
                    <td className="p-3 font-semibold text-muted-foreground">{r.label}</td>
                    {items.map(p => (
                      <td key={p.id} className="p-3 text-foreground">
                        {r.key === "price" ? `Rs.${p.price.toLocaleString()}` :
                         r.key === "rating" ? <span className="flex items-center gap-1"><Star className="h-3.5 w-3.5 fill-primary text-primary" />{p.rating}</span> :
                         (p as any)[r.key] || "—"}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

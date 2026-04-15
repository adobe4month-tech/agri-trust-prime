import { useSearchParams } from "react-router-dom";
import { useMemo } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
import WhatsAppFAB from "@/components/WhatsAppFAB";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";
import ProductCard from "@/components/ProductCard";
import { useLanguage } from "@/contexts/LanguageContext";
import { products } from "@/data/mockData";
import { Search, Package } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function SearchResults() {
  const [params, setParams] = useSearchParams();
  const { language, t } = useLanguage();
  const query = params.get("q") || "";
  const [localQuery, setLocalQuery] = useState(query);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return products.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.nameUrdu.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.targetCrops?.some(c => c.toLowerCase().includes(q)) ||
      p.activeIngredient?.toLowerCase().includes(q)
    );
  }, [query]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setParams({ q: localQuery });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead title={`Search: ${query} - Kissan Cares`} description={`Search results for "${query}" on Kissan Cares.`} />
      <Header />
      <main className="flex-1 pb-20 lg:pb-0">
        <Breadcrumbs items={[{ label: t("nav.home"), to: "/" }, { label: language === "ru" ? "Talaash" : "Search" }]} />
        <div className="container py-6">
          <form onSubmit={handleSearch} className="relative max-w-xl mx-auto mb-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={localQuery}
              onChange={e => setLocalQuery(e.target.value)}
              placeholder={language === "ru" ? "Beej, dawa, khaad..." : "Seeds, pesticides, fertilizers..."}
              className="pl-11 h-12 text-base rounded-xl"
              autoFocus
            />
          </form>

          {query && (
            <p className="text-sm text-muted-foreground mb-4">
              {results.length} {language === "ru" ? `results "${query}" ke liye` : `results for "${query}"`}
            </p>
          )}

          {results.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {results.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          ) : query ? (
            <div className="text-center py-16">
              <Package className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-foreground mb-1">{language === "ru" ? "Kuch nahi mila" : "No results found"}</h3>
              <p className="text-sm text-muted-foreground">{language === "ru" ? "Doosre alfaaz try karein" : "Try different keywords"}</p>
            </div>
          ) : null}
        </div>
      </main>
      <Footer />
      <WhatsAppFAB />
      <BottomNav />
    </div>
  );
}

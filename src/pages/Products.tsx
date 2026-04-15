import { useSearchParams, Link } from "react-router-dom";
import { useState, useMemo } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
import WhatsAppFAB from "@/components/WhatsAppFAB";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";
import ProductCard from "@/components/ProductCard";
import { useLanguage } from "@/contexts/LanguageContext";
import { products, brands } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { SlidersHorizontal, X, Package } from "lucide-react";

export default function Products() {
  const [params] = useSearchParams();
  const { language, t } = useLanguage();
  const [sortBy, setSortBy] = useState("popular");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCrops, setSelectedCrops] = useState<string[]>([]);

  const category = params.get("category");
  const crop = params.get("crop");
  const problem = params.get("problem");
  const brand = params.get("brand");

  const allCrops = useMemo(() => {
    const set = new Set<string>();
    products.forEach(p => p.targetCrops?.forEach(c => set.add(c)));
    return Array.from(set).sort();
  }, []);

  const filtered = useMemo(() => {
    let result = [...products];
    if (category) result = result.filter(p => p.category === category);
    if (crop) result = result.filter(p => p.targetCrops?.some(c => c.toLowerCase().includes(crop.toLowerCase())));
    if (problem) result = result.filter(p => p.targetProblems?.some(pr => pr.toLowerCase().replace(/\s+/g, "-") === problem));
    if (brand) result = result.filter(p => p.brand === brand);
    if (selectedBrands.length) result = result.filter(p => selectedBrands.includes(p.brand));
    if (selectedCrops.length) result = result.filter(p => p.targetCrops?.some(c => selectedCrops.includes(c)));

    switch (sortBy) {
      case "price-low": result.sort((a, b) => a.price - b.price); break;
      case "price-high": result.sort((a, b) => b.price - a.price); break;
      case "rating": result.sort((a, b) => b.rating - a.rating); break;
      case "newest": result.sort((a, b) => b.id - a.id); break;
      default: result.sort((a, b) => b.soldCount - a.soldCount);
    }
    return result;
  }, [category, crop, problem, brand, selectedBrands, selectedCrops, sortBy]);

  const pageTitle = category
    ? `${category.charAt(0).toUpperCase() + category.slice(1)}s`
    : crop ? `${crop.charAt(0).toUpperCase() + crop.slice(1)} Products`
    : problem ? `${problem.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase())} Products`
    : brand ? `${brand} Products`
    : "All Products";

  const toggleBrand = (b: string) => setSelectedBrands(prev => prev.includes(b) ? prev.filter(x => x !== b) : [...prev, b]);
  const toggleCrop = (c: string) => setSelectedCrops(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead title={`${pageTitle} - Buy Online | Kissan Cares`} description={`Browse ${pageTitle.toLowerCase()} at best prices. 100% authentic, cash on delivery.`} canonical={`https://kissancares.com/products`} />
      <Header />
      <main className="flex-1 pb-20 lg:pb-0">
        <Breadcrumbs items={[{ label: t("nav.home"), to: "/" }, { label: pageTitle }]} />
        <div className="container py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-xl md:text-2xl font-extrabold text-foreground">{pageTitle}</h1>
              <p className="text-sm text-muted-foreground">{filtered.length} {language === "ru" ? "products milein" : "products found"}</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="lg:hidden" onClick={() => setShowFilters(!showFilters)}>
                <SlidersHorizontal className="h-4 w-4" /> Filters
              </Button>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[160px] h-9 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">{language === "ru" ? "Maqbool" : "Most Popular"}</SelectItem>
                  <SelectItem value="price-low">{language === "ru" ? "Kam Qeemat" : "Price: Low-High"}</SelectItem>
                  <SelectItem value="price-high">{language === "ru" ? "Zyada Qeemat" : "Price: High-Low"}</SelectItem>
                  <SelectItem value="rating">{language === "ru" ? "Rating" : "Top Rated"}</SelectItem>
                  <SelectItem value="newest">{language === "ru" ? "Naye" : "Newest"}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-6">
            {/* Sidebar Filters */}
            <aside className={`${showFilters ? "block" : "hidden"} lg:block w-full lg:w-56 shrink-0 space-y-6`}>
              {(selectedBrands.length > 0 || selectedCrops.length > 0) && (
                <Button variant="ghost" size="sm" className="text-xs text-muted-foreground" onClick={() => { setSelectedBrands([]); setSelectedCrops([]); }}>
                  <X className="h-3 w-3" /> {language === "ru" ? "Filters Hatayein" : "Clear Filters"}
                </Button>
              )}
              <div>
                <h3 className="text-xs font-extrabold text-foreground uppercase tracking-wider mb-3">{language === "ru" ? "Brand" : "Brand"}</h3>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {brands.map(b => (
                    <label key={b} className="flex items-center gap-2 cursor-pointer group">
                      <Checkbox checked={selectedBrands.includes(b)} onCheckedChange={() => toggleBrand(b)} />
                      <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">{b}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-xs font-extrabold text-foreground uppercase tracking-wider mb-3">{language === "ru" ? "Fasal" : "Target Crop"}</h3>
                <div className="space-y-2">
                  {allCrops.map(c => (
                    <label key={c} className="flex items-center gap-2 cursor-pointer group">
                      <Checkbox checked={selectedCrops.includes(c)} onCheckedChange={() => toggleCrop(c)} />
                      <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">{c}</span>
                    </label>
                  ))}
                </div>
              </div>
            </aside>

            {/* Product Grid */}
            <div className="flex-1">
              {filtered.length === 0 ? (
                <div className="text-center py-16">
                  <Package className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-foreground mb-1">{language === "ru" ? "Koi product nahi mila" : "No products found"}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{language === "ru" ? "Filters badal kar dekhein" : "Try adjusting your filters"}</p>
                  <Button variant="outline" onClick={() => { setSelectedBrands([]); setSelectedCrops([]); }}>
                    {language === "ru" ? "Filters Hatayein" : "Clear Filters"}
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3">
                  {filtered.map(p => <ProductCard key={p.id} product={p} />)}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppFAB />
      <BottomNav />
    </div>
  );
}

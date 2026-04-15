import { useState, useMemo } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
import WhatsAppFAB from "@/components/WhatsAppFAB";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";
import { useLanguage } from "@/contexts/LanguageContext";
import { products } from "@/data/mockData";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calculator as CalcIcon, Droplets, Ruler, Package, MessageCircle } from "lucide-react";

export default function Calculator() {
  const { language } = useLanguage();
  const [selectedProduct, setSelectedProduct] = useState("");
  const [fieldSize, setFieldSize] = useState("");
  const [unit, setUnit] = useState<"acre" | "kanal">("acre");

  const productsWithDosage = products.filter(p => p.dosagePerAcre);
  const product = productsWithDosage.find(p => p.id.toString() === selectedProduct);

  const result = useMemo(() => {
    if (!product || !fieldSize || parseFloat(fieldSize) <= 0) return null;
    const acres = unit === "kanal" ? parseFloat(fieldSize) / 8 : parseFloat(fieldSize);
    const dosageMatch = product.dosagePerAcre?.match(/([\d.]+)\s*(ml|gm|kg|g|ltr)/i);
    if (!dosageMatch) return null;
    const perAcre = parseFloat(dosageMatch[1]);
    const dosageUnit = dosageMatch[2].toLowerCase();
    const totalDosage = perAcre * acres;
    const waterPerAcre = product.applicationMethod?.toLowerCase().includes("granular") ? 0 : 100;
    const totalWater = waterPerAcre * acres;

    return { totalDosage: Math.round(totalDosage * 10) / 10, dosageUnit, totalWater: Math.round(totalWater), acres: Math.round(acres * 100) / 100 };
  }, [product, fieldSize, unit]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title="Dosage Calculator - Kissan Cares"
        description="Calculate exact pesticide, herbicide & fertilizer dosage for your field. Enter product and field size."
        canonical="https://kissancares.com/calculator"
      />
      <Header />
      <main className="flex-1 pb-20 lg:pb-0">
        <Breadcrumbs items={[{ label: language === "ru" ? "Home" : "Home", to: "/" }, { label: language === "ru" ? "Dosage Calculator" : "Dosage Calculator" }]} />
        <div className="container py-8 max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
              <CalcIcon className="h-7 w-7 text-accent" />
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-foreground mb-2">
              {language === "ru" ? "Dosage Calculator" : "Dosage Calculator"}
            </h1>
            <p className="text-sm text-muted-foreground">
              {language === "ru" ? "Apni zameen ke hisaab se sahi miqdar nikaalein" : "Calculate exact dosage for your field size"}
            </p>
          </div>

          <div className="premium-card p-6 space-y-5">
            {/* Product Select */}
            <div>
              <label className="text-xs font-bold text-foreground mb-2 block">
                {language === "ru" ? "Product Chunein" : "Select Product"}
              </label>
              <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                <SelectTrigger className="h-11">
                  <SelectValue placeholder={language === "ru" ? "Product chunein..." : "Choose a product..."} />
                </SelectTrigger>
                <SelectContent>
                  {productsWithDosage.map(p => (
                    <SelectItem key={p.id} value={p.id.toString()}>
                      {language === "ru" ? p.nameUrdu : p.name} — {p.dosagePerAcre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Field Size */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-foreground mb-2 block">
                  {language === "ru" ? "Zameen Ka Size" : "Field Size"}
                </label>
                <Input
                  type="number"
                  min="0"
                  step="0.5"
                  value={fieldSize}
                  onChange={e => setFieldSize(e.target.value)}
                  placeholder="e.g. 5"
                  className="h-11"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-foreground mb-2 block">
                  {language === "ru" ? "Unit" : "Unit"}
                </label>
                <Select value={unit} onValueChange={(v: "acre" | "kanal") => setUnit(v)}>
                  <SelectTrigger className="h-11">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="acre">Acre</SelectItem>
                    <SelectItem value="kanal">Kanal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Result */}
            {result && product && (
              <div className="bg-primary/5 border border-primary/15 rounded-xl p-5 space-y-4 animate-fade-in">
                <h3 className="text-sm font-extrabold text-foreground">
                  {language === "ru" ? "Aapki Dosage:" : "Your Dosage:"}
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-card rounded-lg p-3 text-center border border-border/50">
                    <Package className="h-5 w-5 text-primary mx-auto mb-1" />
                    <p className="text-xl font-extrabold text-foreground">{result.totalDosage}{result.dosageUnit}</p>
                    <p className="text-[10px] text-muted-foreground">{language === "ru" ? "Kul Dawa" : "Total Product"}</p>
                  </div>
                  {result.totalWater > 0 && (
                    <div className="bg-card rounded-lg p-3 text-center border border-border/50">
                      <Droplets className="h-5 w-5 text-blue-500 mx-auto mb-1" />
                      <p className="text-xl font-extrabold text-foreground">{result.totalWater}L</p>
                      <p className="text-[10px] text-muted-foreground">{language === "ru" ? "Kul Paani" : "Total Water"}</p>
                    </div>
                  )}
                </div>
                <div className="text-[11px] text-muted-foreground space-y-1">
                  <p><Ruler className="h-3 w-3 inline mr-1" /> {language === "ru" ? `Zameen: ${result.acres} acre` : `Field: ${result.acres} acres`}</p>
                  <p><Package className="h-3 w-3 inline mr-1" /> {language === "ru" ? `Dosage/acre: ${product.dosagePerAcre}` : `Dosage/acre: ${product.dosagePerAcre}`}</p>
                  <p>📋 {product.applicationMethod}</p>
                </div>

                <Button asChild variant="whatsapp" size="sm" className="w-full">
                  <a
                    href={`https://wa.me/923240287276?text=${encodeURIComponent(`Hi, I need ${result.totalDosage}${result.dosageUnit} of ${product.name} for ${result.acres} acres. Please confirm.`)}`}
                    target="_blank" rel="noopener noreferrer"
                  >
                    <MessageCircle className="h-4 w-4" /> {language === "ru" ? "WhatsApp Par Order Karein" : "Order on WhatsApp"}
                  </a>
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppFAB />
      <BottomNav />
    </div>
  );
}

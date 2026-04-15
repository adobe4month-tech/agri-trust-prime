import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
import WhatsAppFAB from "@/components/WhatsAppFAB";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";
import { useLanguage } from "@/contexts/LanguageContext";
import { marketRates, cities } from "@/data/marketRatesData";
import { TrendingUp, TrendingDown, Minus, CalendarDays } from "lucide-react";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function MarketRates() {
  const { language } = useLanguage();
  const [selectedCity, setSelectedCity] = useState("all");
  const today = new Date().toLocaleDateString("en-PK", { day: "numeric", month: "long", year: "numeric" });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title="Crop Market Rates Pakistan - Today's Mandi Prices"
        description="Check today's crop market rates in Pakistan. Wheat, rice, cotton, maize prices by city. Updated daily."
        canonical="https://kissancares.com/market-rates"
      />
      <Header />
      <main className="flex-1 pb-20 lg:pb-0">
        <Breadcrumbs items={[{ label: language === "ru" ? "Home" : "Home", to: "/" }, { label: language === "ru" ? "Mandi Rates" : "Market Rates" }]} />
        <div className="container py-8">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="h-7 w-7 text-primary" />
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-foreground mb-2">
              {language === "ru" ? "Aaj Ki Mandi Rates" : "Today's Market Rates"}
            </h1>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <CalendarDays className="h-4 w-4" />
              <span>{language === "ru" ? `Updated: ${today}` : `Updated: ${today}`}</span>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              {language === "ru" ? "Pakistan ke bade shehron ki fasal ki qeematein" : "Crop prices from major cities across Pakistan"}
            </p>
          </div>

          <div className="flex justify-end mb-4">
            <Select value={selectedCity} onValueChange={setSelectedCity}>
              <SelectTrigger className="w-[180px] h-9 text-xs">
                <SelectValue placeholder="Filter by city" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{language === "ru" ? "Sab Sheher" : "All Cities"}</SelectItem>
                {cities.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          <div className="premium-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-secondary/50 border-b border-border/50">
                    <th className="text-left px-4 py-3 text-xs font-extrabold text-foreground uppercase tracking-wider">{language === "ru" ? "Fasal" : "Crop"}</th>
                    <th className="text-center px-4 py-3 text-xs font-extrabold text-foreground uppercase tracking-wider">{language === "ru" ? "Unit" : "Unit"}</th>
                    {(selectedCity === "all" ? cities : [selectedCity]).map(city => (
                      <th key={city} className="text-right px-4 py-3 text-xs font-extrabold text-foreground uppercase tracking-wider">{city}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {marketRates.map((rate, i) => (
                    <tr key={rate.crop} className={`border-b border-border/30 ${i % 2 === 0 ? "bg-secondary/10" : ""}`}>
                      <td className="px-4 py-3">
                        <p className="font-bold text-foreground">{rate.crop}</p>
                        <p className="text-[10px] text-muted-foreground" dir="rtl">{rate.cropUrdu}</p>
                      </td>
                      <td className="text-center px-4 py-3 text-xs text-muted-foreground">{rate.unit}</td>
                      {(selectedCity === "all" ? cities : [selectedCity]).map(city => (
                        <td key={city} className="text-right px-4 py-3 font-bold text-foreground">
                          Rs.{rate.cities[city]?.toLocaleString() || "—"}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <p className="text-[10px] text-muted-foreground text-center mt-4">
            {language === "ru"
              ? "Yeh qeematein taakhiri update ke mutabiq hain. Mandi mein qeematein badal sakti hain."
              : "Prices are indicative and may vary. Check with local mandis for exact rates."}
          </p>
        </div>
      </main>
      <Footer />
      <WhatsAppFAB />
      <BottomNav />
    </div>
  );
}

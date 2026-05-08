import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
import SEOHead from "@/components/SEOHead";
import { useLoyalty } from "@/contexts/LoyaltyContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Coins, ShoppingBag, Gift, Users, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Loyalty() {
  const { coins, history, redemptionRate } = useLoyalty();
  const { language } = useLanguage();
  const t = (en: string, ru: string) => language === "ru" ? ru : en;
  const rsValue = Math.floor(coins / redemptionRate);

  const tiers = [
    { coins: 100, rs: 50 },
    { coins: 250, rs: 125 },
    { coins: 500, rs: 250 },
    { coins: 1000, rs: 500 },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEOHead title="Kissan Coins — KissanCares" description="Earn rewards on every purchase." />
      <Header />
      <main className="flex-1 container max-w-3xl py-8 pb-24 lg:pb-8">
        <div className="bg-gradient-to-br from-agri-deep to-trust-green text-primary-foreground rounded-3xl p-6 mb-6 relative overflow-hidden">
          <Coins className="absolute -right-4 -bottom-4 h-32 w-32 opacity-10" />
          <p className="text-xs uppercase tracking-wider opacity-80 mb-1">{t("Your Balance", "Aapka Balance")}</p>
          <h1 className="text-5xl font-extrabold flex items-baseline gap-2">{coins} <span className="text-lg opacity-80">{t("coins", "coins")}</span></h1>
          <p className="text-sm opacity-90 mt-2">≈ Rs.{rsValue.toLocaleString()} {t("off your next order", "agle order par discount")}</p>
        </div>

        <div className="grid sm:grid-cols-3 gap-3 mb-8">
          <div className="premium-card p-4 text-center"><ShoppingBag className="h-6 w-6 text-primary mx-auto mb-2" /><p className="text-xs text-muted-foreground">{t("Earn", "Kamayein")}</p><p className="font-extrabold text-sm">1 {t("coin per Rs.100", "coin har Rs.100 par")}</p></div>
          <div className="premium-card p-4 text-center"><Users className="h-6 w-6 text-primary mx-auto mb-2" /><p className="text-xs text-muted-foreground">{t("Refer", "Refer karein")}</p><p className="font-extrabold text-sm">200 {t("coins per friend", "coins har dost par")}</p></div>
          <div className="premium-card p-4 text-center"><Gift className="h-6 w-6 text-primary mx-auto mb-2" /><p className="text-xs text-muted-foreground">{t("Redeem", "Istemal")}</p><p className="font-extrabold text-sm">{redemptionRate} {t("coins = Re.1", "coins = Re.1")}</p></div>
        </div>

        <h2 className="text-lg font-extrabold mb-3 flex items-center gap-2"><Trophy className="h-5 w-5 text-agri-gold" />{t("Redemption Tiers", "Redemption Tiers")}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {tiers.map(t2 => (
            <div key={t2.coins} className={`premium-card p-4 text-center ${coins >= t2.coins ? "border-primary bg-primary/5" : "opacity-60"}`}>
              <p className="text-2xl font-extrabold text-foreground">{t2.coins}</p>
              <p className="text-xs text-muted-foreground">coins</p>
              <p className="text-sm font-bold text-primary mt-1">Rs.{t2.rs} off</p>
            </div>
          ))}
        </div>

        <h2 className="text-lg font-extrabold mb-3">{t("Recent Activity", "Halia Activity")}</h2>
        <div className="bg-card border border-border rounded-2xl divide-y divide-border">
          {history.length === 0 ? (
            <p className="p-6 text-center text-sm text-muted-foreground">{t("No activity yet — start shopping!", "Abhi koi activity nahi — khareedari shuru karein!")}</p>
          ) : history.slice(0, 10).map(h => (
            <div key={h.id} className="flex items-center justify-between px-4 py-3">
              <div>
                <p className="text-sm font-semibold">{h.reason}</p>
                <p className="text-xs text-muted-foreground">{new Date(h.date).toLocaleDateString()}</p>
              </div>
              <p className={`font-extrabold text-sm ${h.type === "earn" ? "text-primary" : "text-sale"}`}>{h.type === "earn" ? "+" : "−"}{h.coins}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 flex gap-3">
          <Button asChild variant="hero" className="flex-1"><Link to="/products">{t("Shop & Earn", "Khareedein Aur Kamayein")}</Link></Button>
          <Button asChild variant="outline" className="flex-1"><Link to="/refer">{t("Refer Friends", "Doston Ko Refer Karein")}</Link></Button>
        </div>
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
}

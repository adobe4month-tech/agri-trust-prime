import AccountLayout from "@/components/account/AccountLayout";
import { useLoyalty } from "@/contexts/LoyaltyContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Coins } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function AccountCoins() {
  const { coins, history, redemptionRate } = useLoyalty();
  const { language } = useLanguage();
  const t = (en: string, ru: string) => language === "ru" ? ru : en;
  return (
    <AccountLayout title={t("Kissan Coins", "Kissan Coins")}>
      <div className="bg-gradient-to-br from-agri-deep to-trust-green text-primary-foreground rounded-2xl p-5 mb-5 flex items-center justify-between">
        <div>
          <p className="text-xs opacity-80">{t("Balance", "Balance")}</p>
          <p className="text-3xl font-extrabold flex items-center gap-2"><Coins className="h-6 w-6" />{coins}</p>
          <p className="text-xs opacity-80 mt-1">≈ Rs.{Math.floor(coins / redemptionRate)} off</p>
        </div>
        <Button asChild variant="hero-outline"><Link to="/loyalty">{t("View Tiers", "Tiers Dekhein")}</Link></Button>
      </div>
      <h3 className="font-extrabold mb-2">{t("History", "History")}</h3>
      <div className="bg-card border border-border rounded-2xl divide-y divide-border">
        {history.length === 0 ? <p className="p-4 text-sm text-muted-foreground text-center">{t("No activity yet.", "Abhi koi activity nahi.")}</p> :
          history.slice(0, 20).map(h => (
            <div key={h.id} className="flex justify-between items-center px-4 py-3">
              <div><p className="text-sm font-semibold">{h.reason}</p><p className="text-xs text-muted-foreground">{new Date(h.date).toLocaleDateString()}</p></div>
              <p className={`font-extrabold ${h.type === "earn" ? "text-primary" : "text-sale"}`}>{h.type === "earn" ? "+" : "−"}{h.coins}</p>
            </div>
          ))}
      </div>
    </AccountLayout>
  );
}

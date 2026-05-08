import { useMemo } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Copy, MessageCircle, Share2, Trophy, Gift } from "lucide-react";
import { toast } from "sonner";

const mockLeaderboard = [
  { name: "Ali R., Multan", refs: 23, earned: 4600 },
  { name: "Hassan K., Faisalabad", refs: 18, earned: 3600 },
  { name: "Imran B., Sahiwal", refs: 14, earned: 2800 },
  { name: "Adeel S., Lahore", refs: 11, earned: 2200 },
  { name: "Tariq M., Sargodha", refs: 9, earned: 1800 },
];

export default function Refer() {
  const { language } = useLanguage();
  const t = (en: string, ru: string) => language === "ru" ? ru : en;

  const code = useMemo(() => {
    let c = localStorage.getItem("kc-refer-code");
    if (!c) { c = "KC" + Math.random().toString(36).slice(2, 7).toUpperCase(); localStorage.setItem("kc-refer-code", c); }
    return c;
  }, []);

  const link = `https://kissancares.com/?ref=${code}`;
  const message = encodeURIComponent(`Salaam! KissanCares se asli zar'ai products khareedein. Mera code ${code} use karein aur Rs.200 discount paayein. ${link}`);

  const copyCode = () => { navigator.clipboard.writeText(code); toast.success(t("Code copied!", "Code copy ho gaya!")); };
  const copyLink = () => { navigator.clipboard.writeText(link); toast.success(t("Link copied!", "Link copy ho gaya!")); };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEOHead title="Refer & Earn — KissanCares" description="Refer farmer friends, both get Rs.200." />
      <Header />
      <main className="flex-1 container max-w-3xl py-8 pb-24 lg:pb-8">
        <div className="text-center mb-8">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center mb-4"><Gift className="h-7 w-7 text-primary" /></div>
          <h1 className="text-3xl font-extrabold">{t("Refer & Earn Rs.200", "Refer Karein, Rs.200 Kamayein")}</h1>
          <p className="text-sm text-muted-foreground mt-2">{t("You get Rs.200 + 200 coins. Friend gets Rs.200 off first order.", "Aap ko Rs.200 + 200 coins. Dost ko Rs.200 off pehle order par.")}</p>
        </div>

        <div className="premium-card p-6 mb-6 bg-gradient-to-br from-primary/5 to-agri-gold/5">
          <p className="text-xs text-muted-foreground mb-2">{t("Your Referral Code", "Aapka Referral Code")}</p>
          <div className="flex gap-2">
            <div className="flex-1 bg-card border-2 border-dashed border-primary/30 rounded-xl px-4 py-3 text-center">
              <p className="text-2xl font-extrabold tracking-widest text-primary">{code}</p>
            </div>
            <Button variant="outline" size="lg" onClick={copyCode}><Copy className="h-4 w-4" /></Button>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-3">
            <Button asChild variant="whatsapp"><a href={`https://wa.me/?text=${message}`} target="_blank" rel="noreferrer"><MessageCircle className="h-4 w-4" />WhatsApp</a></Button>
            <Button variant="outline" onClick={copyLink}><Share2 className="h-4 w-4" />{t("Copy Link", "Link Copy")}</Button>
          </div>
        </div>

        <h2 className="text-lg font-extrabold mb-3 flex items-center gap-2"><Trophy className="h-5 w-5 text-agri-gold" />{t("Top Referrers This Month", "Iss Maheene Ke Top Referrers")}</h2>
        <div className="bg-card border border-border rounded-2xl divide-y divide-border">
          {mockLeaderboard.map((row, i) => (
            <div key={row.name} className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center gap-3">
                <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-extrabold ${i === 0 ? "bg-agri-gold text-primary-foreground" : i < 3 ? "bg-primary/10 text-primary" : "bg-secondary text-muted-foreground"}`}>{i + 1}</span>
                <div>
                  <p className="text-sm font-bold">{row.name}</p>
                  <p className="text-xs text-muted-foreground">{row.refs} {t("referrals", "referrals")}</p>
                </div>
              </div>
              <p className="text-sm font-extrabold text-primary">Rs.{row.earned.toLocaleString()}</p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
}

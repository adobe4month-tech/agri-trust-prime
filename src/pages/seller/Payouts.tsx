import SellerLayout from "@/components/seller/SellerLayout";
import { useLanguage } from "@/contexts/LanguageContext";
import { Wallet, Calendar } from "lucide-react";

const payouts = [
  { id: "PO-115", date: "2026-05-01", amt: 184500, status: "Paid" },
  { id: "PO-114", date: "2026-04-15", amt: 142800, status: "Paid" },
  { id: "PO-113", date: "2026-04-01", amt: 167200, status: "Paid" },
  { id: "PO-112", date: "2026-03-15", amt: 98400, status: "Paid" },
];

export default function SellerPayouts() {
  const { language } = useLanguage();
  const t = (en: string, ru: string) => language === "ru" ? ru : en;
  return (
    <SellerLayout title={t("Payouts", "Payouts")}>
      <div className="grid sm:grid-cols-2 gap-3 mb-6">
        <div className="premium-card p-5"><Wallet className="h-6 w-6 text-primary mb-2" /><p className="text-xs text-muted-foreground">{t("Pending Payout", "Aane Wala Payout")}</p><p className="text-3xl font-extrabold">Rs.180,000</p></div>
        <div className="premium-card p-5"><Calendar className="h-6 w-6 text-primary mb-2" /><p className="text-xs text-muted-foreground">{t("Next Payout Date", "Agla Payout Date")}</p><p className="text-3xl font-extrabold">15 May</p></div>
      </div>
      <div className="premium-card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-secondary/40 text-xs font-extrabold uppercase tracking-wider text-muted-foreground">
            <tr><th className="text-left px-4 py-2">ID</th><th className="text-left px-4 py-2">Date</th><th className="text-right px-4 py-2">Amount</th><th className="text-center px-4 py-2">Status</th></tr>
          </thead>
          <tbody className="divide-y divide-border">
            {payouts.map(p => (
              <tr key={p.id}><td className="px-4 py-2 text-xs font-bold">{p.id}</td><td className="px-4 py-2 text-xs">{p.date}</td><td className="px-4 py-2 text-xs text-right font-extrabold">Rs.{p.amt.toLocaleString()}</td><td className="px-4 py-2 text-center"><span className="text-xs text-primary font-bold">{p.status}</span></td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </SellerLayout>
  );
}

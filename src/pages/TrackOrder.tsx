import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
import WhatsAppFAB from "@/components/WhatsAppFAB";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MessageCircle, Package, Truck, CheckCircle2, Clock, MapPin, PhoneCall } from "lucide-react";

const mockSteps = [
  { icon: Package, key: "placed", label_en: "Confirmed", label_ru: "Confirm" },
  { icon: Clock, key: "packed", label_en: "Packed", label_ru: "Pack" },
  { icon: Truck, key: "shipped", label_en: "Dispatched", label_ru: "Bhej Diya" },
  { icon: MapPin, key: "out", label_en: "Out for Delivery", label_ru: "Raaste Mein" },
  { icon: CheckCircle2, key: "delivered", label_en: "Delivered", label_ru: "Mil Gaya" },
];

const checkpoints = [
  { time: "May 06, 10:24", text_en: "Order confirmed at Lahore warehouse", text_ru: "Lahore warehouse mein confirm" },
  { time: "May 06, 16:10", text_en: "Packed and labeled", text_ru: "Pack ho gaya" },
  { time: "May 07, 08:45", text_en: "Dispatched via TCS Express", text_ru: "TCS Express se rawana" },
  { time: "May 08, 11:12", text_en: "Arrived at Multan hub — out for delivery", text_ru: "Multan pohanch gaya — delivery par" },
];

export default function TrackOrder() {
  const { language, t } = useLanguage();
  const [orderId, setOrderId] = useState("");
  const [phone, setPhone] = useState("");
  const [tracked, setTracked] = useState(false);
  const currentStep = 3;

  const handleTrack = (e: React.FormEvent) => { e.preventDefault(); if (orderId && phone) setTracked(true); };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead title="Track Your Order" description="Track your KissanCares order with live timeline and ETA." canonical="https://kissancares.com/track" />
      <Header />
      <main className="flex-1 pb-20 lg:pb-0">
        <Breadcrumbs items={[{ label: t("nav.home"), to: "/" }, { label: t("track.title") }]} />
        <div className="container max-w-2xl py-8">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4"><Search className="h-7 w-7 text-primary" /></div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-foreground">{t("track.title")}</h1>
          </div>

          {!tracked && (
            <form onSubmit={handleTrack} className="premium-card p-6 space-y-4">
              <div><label className="text-xs font-bold text-foreground mb-1.5 block">{t("track.orderId")}</label><Input placeholder="e.g. KC-2847" value={orderId} onChange={(e) => setOrderId(e.target.value)} className="h-11" /></div>
              <div><label className="text-xs font-bold text-foreground mb-1.5 block">{t("track.phone")}</label><Input placeholder="03XX-XXXXXXX" value={phone} onChange={(e) => setPhone(e.target.value)} className="h-11" /></div>
              <Button type="submit" variant="hero" size="lg" className="w-full"><Search className="h-4 w-4" /> {t("track.button")}</Button>
            </form>
          )}

          {tracked && (
            <div className="space-y-5 animate-fade-in">
              <div className="premium-card p-5">
                <div className="flex items-center justify-between mb-2">
                  <div><p className="text-xs text-muted-foreground">Order</p><p className="text-base font-extrabold">{orderId}</p></div>
                  <div className="text-right"><p className="text-xs text-muted-foreground">{language === "ru" ? "Andazan Delivery" : "Estimated Delivery"}</p><p className="text-sm font-extrabold text-primary">May 09</p></div>
                </div>
                {/* Timeline */}
                <div className="mt-6 flex items-start justify-between relative">
                  <div className="absolute top-5 left-5 right-5 h-0.5 bg-border" />
                  <div className="absolute top-5 left-5 h-0.5 bg-primary transition-all duration-500" style={{ width: `${(currentStep / (mockSteps.length - 1)) * 95}%` }} />
                  {mockSteps.map((step, i) => {
                    const done = i <= currentStep;
                    return (
                      <div key={i} className="relative flex flex-col items-center z-10 flex-1">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${done ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"}`}><step.icon className="h-4 w-4" /></div>
                        <p className={`text-[9px] font-bold mt-2 text-center ${done ? "text-primary" : "text-muted-foreground"}`}>{language === "ru" ? step.label_ru : step.label_en}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Mock Pakistan map illustration */}
              <div className="premium-card p-5">
                <h3 className="text-sm font-extrabold mb-3 flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" />{language === "ru" ? "Mojooda Location" : "Current Location"}</h3>
                <div className="relative bg-gradient-to-br from-primary/5 to-trust-green/5 rounded-xl aspect-[16/10] border border-border overflow-hidden">
                  <svg viewBox="0 0 400 250" className="w-full h-full">
                    <path d="M80 50 Q120 30 180 60 Q240 40 290 80 Q330 120 320 180 Q280 220 220 210 Q160 220 120 190 Q70 160 60 110 Q60 80 80 50 Z" fill="hsl(var(--primary)/0.08)" stroke="hsl(var(--primary)/0.3)" strokeWidth="2" />
                    {/* Lahore */}
                    <circle cx="240" cy="90" r="5" fill="hsl(var(--primary))" />
                    <text x="248" y="88" fontSize="10" fill="hsl(var(--foreground))" fontWeight="700">Lahore (origin)</text>
                    {/* Route */}
                    <path d="M240 90 Q200 130 170 170" stroke="hsl(var(--primary))" strokeWidth="2.5" strokeDasharray="5,4" fill="none" />
                    {/* Multan (current) */}
                    <circle cx="170" cy="170" r="7" fill="hsl(var(--accent))" stroke="hsl(var(--card))" strokeWidth="2">
                      <animate attributeName="r" values="6;9;6" dur="1.5s" repeatCount="indefinite" />
                    </circle>
                    <text x="178" y="174" fontSize="10" fill="hsl(var(--foreground))" fontWeight="700">Multan (now)</text>
                  </svg>
                </div>
                <div className="mt-3 flex items-center justify-between text-xs">
                  <div><p className="text-muted-foreground">{language === "ru" ? "Courier" : "Courier"}</p><p className="font-bold">TCS Express</p></div>
                  <Button asChild size="sm" variant="outline"><a href="https://wa.me/923240287276"><PhoneCall className="h-3 w-3" />{language === "ru" ? "Driver" : "Driver"}</a></Button>
                </div>
              </div>

              {/* Checkpoints */}
              <div className="premium-card p-5">
                <h3 className="text-sm font-extrabold mb-3">{language === "ru" ? "Checkpoints" : "Tracking History"}</h3>
                <div className="space-y-3">
                  {checkpoints.map((c, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0" />
                      <div className="flex-1 pb-3 border-b border-border last:border-0">
                        <p className="text-sm font-semibold">{language === "ru" ? c.text_ru : c.text_en}</p>
                        <p className="text-[11px] text-muted-foreground">{c.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground mb-3">{t("track.help")}</p>
            <Button asChild variant="whatsapp"><a href="https://wa.me/923240287276?text=Hi, I need help tracking my order." target="_blank" rel="noopener noreferrer"><MessageCircle className="h-4 w-4" /> WhatsApp</a></Button>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppFAB />
      <BottomNav />
    </div>
  );
}

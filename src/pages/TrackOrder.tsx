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
import { Search, MessageCircle, Package, Truck, CheckCircle2, Clock } from "lucide-react";

const mockSteps = [
  { icon: Package, key: "placed" },
  { icon: Clock, key: "processing" },
  { icon: Truck, key: "shipped" },
  { icon: CheckCircle2, key: "delivered" },
];

export default function TrackOrder() {
  const { language, t } = useLanguage();
  const [orderId, setOrderId] = useState("");
  const [phone, setPhone] = useState("");
  const [tracked, setTracked] = useState(false);
  const [currentStep, setCurrentStep] = useState(2); // Mock: shipped

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderId && phone) setTracked(true);
  };

  const stepLabels: Record<string, string> = {
    placed: t("track.placed"),
    processing: t("track.processing"),
    shipped: t("track.shipped"),
    delivered: t("track.delivered"),
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title="Track Your Order"
        description="Track your KissanCares order status. Enter your order ID and phone number to see real-time delivery updates."
        canonical="https://kissancares.com/track"
      />
      <Header />

      <main className="flex-1 pb-20 lg:pb-0">
        <Breadcrumbs items={[{ label: t("nav.home"), to: "/" }, { label: t("track.title") }]} />

        <div className="container max-w-lg py-8">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Search className="h-7 w-7 text-primary" />
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-foreground">{t("track.title")}</h1>
          </div>

          {/* Form */}
          <form onSubmit={handleTrack} className="premium-card p-6 space-y-4">
            <div>
              <label className="text-xs font-bold text-foreground mb-1.5 block">{t("track.orderId")}</label>
              <Input
                placeholder="e.g. KC-2847"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                className="h-11"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-foreground mb-1.5 block">{t("track.phone")}</label>
              <Input
                placeholder="e.g. 0324-028-7276"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="h-11"
              />
            </div>
            <Button type="submit" variant="default" size="lg" className="w-full">
              <Search className="h-4 w-4" /> {t("track.button")}
            </Button>
          </form>

          {/* Mock result */}
          {tracked && (
            <div className="mt-8 premium-card p-6 animate-fade-in">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-xs text-muted-foreground">Order</p>
                  <p className="text-sm font-bold text-foreground">{orderId}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Status</p>
                  <p className="text-sm font-bold text-primary">{stepLabels[mockSteps[currentStep].key]}</p>
                </div>
              </div>

              {/* Stepper */}
              <div className="flex items-center justify-between relative">
                {/* Line */}
                <div className="absolute top-5 left-5 right-5 h-0.5 bg-border" />
                <div
                  className="absolute top-5 left-5 h-0.5 bg-primary transition-all duration-500"
                  style={{ width: `${(currentStep / (mockSteps.length - 1)) * (100 - 10)}%` }}
                />

                {mockSteps.map((step, i) => {
                  const done = i <= currentStep;
                  return (
                    <div key={i} className="relative flex flex-col items-center z-10">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                        done ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
                      }`}>
                        <step.icon className="h-4 w-4" />
                      </div>
                      <p className={`text-[10px] font-semibold mt-2 text-center ${done ? "text-primary" : "text-muted-foreground"}`}>
                        {stepLabels[step.key]}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Help */}
          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground mb-3">{t("track.help")}</p>
            <Button asChild variant="whatsapp" size="default">
              <a href="https://wa.me/923240287276?text=Hi, I need help tracking my order." target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppFAB />
      <BottomNav />
    </div>
  );
}

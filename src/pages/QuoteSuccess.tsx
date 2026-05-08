import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { CheckCircle2, MessageCircle } from "lucide-react";

export default function QuoteSuccess() {
  const { language } = useLanguage();
  const t = (en: string, ru: string) => language === "ru" ? ru : en;
  const [id, setId] = useState("");
  useEffect(() => { setId("Q-" + Math.floor(Math.random() * 9000 + 1000)); }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEOHead title="Quote Submitted — KissanCares" description="Bulk quote submitted successfully." />
      <Header />
      <main className="flex-1 max-w-2xl mx-auto px-4 py-12 text-center">
        <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-6"><CheckCircle2 className="h-12 w-12 text-primary" /></div>
        <h1 className="text-3xl font-extrabold mb-2">{t("Quote Request Sent!", "Quote Bhej Di Gayi!")}</h1>
        <p className="text-muted-foreground mb-6">{t("Our B2B team will respond within 24 hours.", "Hamari B2B team 24 ghante mein jawab degi.")}</p>
        <div className="bg-card border border-border rounded-2xl p-6 mb-6 inline-block">
          <p className="text-xs text-muted-foreground">{t("Your Quote ID", "Aapki Quote ID")}</p>
          <p className="text-3xl font-extrabold tracking-wider text-primary">{id}</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild variant="hero"><a href="https://wa.me/923240287276" target="_blank" rel="noreferrer"><MessageCircle className="h-4 w-4" />{t("Chat on WhatsApp", "WhatsApp Par Baat")}</a></Button>
          <Button asChild variant="outline"><Link to="/">{t("Back Home", "Home")}</Link></Button>
        </div>
      </main>
      <Footer />
    </div>
  );
}

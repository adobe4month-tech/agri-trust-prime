import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
import WhatsAppFAB from "@/components/WhatsAppFAB";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Store, ArrowRight, MessageCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useState } from "react";

export default function SellerLogin() {
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    localStorage.setItem("kc-seller", email);
    toast.success(language === "ru" ? "Login kaamyab!" : "Logged in!");
    navigate("/seller");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead title="Seller Login - Kissan Cares" description="Login to your KissanCares seller account to manage products and orders." canonical="https://kissancares.com/seller-login" />
      <Header />
      <main className="flex-1 pb-20 lg:pb-0">
        <Breadcrumbs items={[{ label: t("nav.home"), to: "/" }, { label: language === "ru" ? "Seller Login" : "Seller Login" }]} />

        <div className="container py-10 flex justify-center">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Store className="h-7 w-7 text-primary" />
              </div>
              <h1 className="text-2xl font-extrabold text-foreground mb-2">
                {language === "ru" ? "Seller Account Login" : "Seller Account Login"}
              </h1>
              <p className="text-sm text-muted-foreground">
                {language === "ru" ? "Apne seller dashboard mein login karein" : "Login to your seller dashboard"}
              </p>
            </div>

            <div className="premium-card p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label className="text-sm font-semibold text-foreground">Email</Label>
                  <Input required type="email" placeholder="seller@company.com" className="mt-1.5" />
                </div>
                <div>
                  <Label className="text-sm font-semibold text-foreground">
                    {language === "ru" ? "Password" : "Password"}
                  </Label>
                  <Input required type="password" placeholder="••••••••" className="mt-1.5" />
                </div>
                <Button type="submit" variant="hero" className="w-full">
                  {language === "ru" ? "Login Karein" : "Login"} <ArrowRight className="h-4 w-4" />
                </Button>
              </form>

              <div className="mt-5 pt-5 border-t border-border text-center space-y-3">
                <p className="text-xs text-muted-foreground">
                  {language === "ru" ? "Account nahi hai?" : "Don't have an account?"}
                </p>
                <Link to="/sell-with-us" className="text-sm font-bold text-primary hover:underline">
                  {language === "ru" ? "Seller Ke Taur Par Register Karein" : "Register as a Seller"}
                </Link>
              </div>
            </div>

            <Button asChild variant="whatsapp" size="lg" className="w-full mt-4">
              <a href="https://wa.me/923240287276?text=I want to register as a seller on KissanCares" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-5 w-5" />
                {language === "ru" ? "WhatsApp Par Madad Lein" : "Get Help on WhatsApp"}
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

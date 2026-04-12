import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
import WhatsAppFAB from "@/components/WhatsAppFAB";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

export default function Contact() {
  const { language, t } = useLanguage();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      toast.success(language === "ru" ? "Aapka paigham bhej diya gaya!" : "Your message has been sent!");
      setLoading(false);
      (e.target as HTMLFormElement).reset();
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead title="Contact Kissan Cares - Get In Touch" description="Contact KissanCares for agricultural products, orders, or partnerships. Call, email, or WhatsApp us." canonical="https://kissancares.com/contact" />
      <Header />
      <main className="flex-1 pb-20 lg:pb-0">
        <Breadcrumbs items={[{ label: t("nav.home"), to: "/" }, { label: language === "ru" ? "Rabta Karein" : "Contact Us" }]} />

        <div className="container py-10">
          <h1 className="text-2xl md:text-3xl font-extrabold text-foreground mb-8 text-center">
            {language === "ru" ? "Hum Se Rabta Karein" : "Contact Us"}
          </h1>

          <div className="grid lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
            {/* Contact Info */}
            <div className="space-y-6">
              <div className="premium-card p-6 space-y-5">
                <h2 className="font-bold text-foreground">
                  {language === "ru" ? "Rabta Ki Tafseel" : "Contact Information"}
                </h2>
                <a href="tel:+923240287276" className="flex items-center gap-3 text-sm text-foreground hover:text-primary transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold">+92 324 028 7276</p>
                    <p className="text-xs text-muted-foreground">{language === "ru" ? "Somwar - Sanichar, 9am - 6pm" : "Mon - Sat, 9am - 6pm"}</p>
                  </div>
                </a>
                <a href="mailto:info@kissancares.com" className="flex items-center gap-3 text-sm text-foreground hover:text-primary transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold">info@kissancares.com</p>
                    <p className="text-xs text-muted-foreground">{language === "ru" ? "24 ghante mein jawaab" : "Response within 24 hours"}</p>
                  </div>
                </a>
                <div className="flex items-center gap-3 text-sm text-foreground">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold">Sargodha, Punjab</p>
                    <p className="text-xs text-muted-foreground">Pakistan</p>
                  </div>
                </div>
              </div>

              <Button asChild variant="whatsapp" size="lg" className="w-full">
                <a href="https://wa.me/923240287276?text=Assalam o Alaikum! I need help with..." target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-5 w-5" />
                  {language === "ru" ? "WhatsApp Par Baat Karein" : "Chat on WhatsApp"}
                </a>
              </Button>
            </div>

            {/* Form */}
            <div className="premium-card p-6">
              <h2 className="font-bold text-foreground mb-5">
                {language === "ru" ? "Paigham Bhejein" : "Send a Message"}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label className="text-sm font-semibold text-foreground">{language === "ru" ? "Naam" : "Name"}</Label>
                  <Input required placeholder={language === "ru" ? "Apna naam" : "Your name"} className="mt-1.5" maxLength={100} />
                </div>
                <div>
                  <Label className="text-sm font-semibold text-foreground">Email</Label>
                  <Input required type="email" placeholder="email@example.com" className="mt-1.5" maxLength={255} />
                </div>
                <div>
                  <Label className="text-sm font-semibold text-foreground">{language === "ru" ? "Mozoo" : "Subject"}</Label>
                  <Input required placeholder={language === "ru" ? "Kis baare mein?" : "What is this about?"} className="mt-1.5" maxLength={200} />
                </div>
                <div>
                  <Label className="text-sm font-semibold text-foreground">{language === "ru" ? "Paigham" : "Message"}</Label>
                  <Textarea required placeholder={language === "ru" ? "Apna paigham likhein..." : "Write your message..."} className="mt-1.5 min-h-[120px]" maxLength={1000} />
                </div>
                <Button type="submit" variant="hero" className="w-full" disabled={loading}>
                  {loading ? (language === "ru" ? "Bhej rahe hain..." : "Sending...") : (language === "ru" ? "Paigham Bhejein" : "Send Message")}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppFAB />
      <BottomNav />
    </div>
  );
}

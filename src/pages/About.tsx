import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
import WhatsAppFAB from "@/components/WhatsAppFAB";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";
import { useLanguage } from "@/contexts/LanguageContext";
import { ShieldCheck, Truck, Users, Award, MapPin, Phone, Mail } from "lucide-react";

export default function About() {
  const { language, t } = useLanguage();

  const values = [
    { icon: ShieldCheck, en: "100% Original Products", ru: "100% Asli Products", descEn: "Every product is verified for authenticity before listing.", descRu: "Har product listing se pehle asli hone ki tasdeeq ki jaati hai." },
    { icon: Truck, en: "Nationwide Delivery", ru: "Poore Pakistan Mein Delivery", descEn: "We deliver to 120+ cities across Pakistan with COD.", descRu: "120+ shehron mein Cash on Delivery ke saath." },
    { icon: Users, en: "12,500+ Farmers Trust Us", ru: "12,500+ Kissanon Ka Bharosa", descEn: "A growing community of farmers who rely on KissanCares.", descRu: "Kissanon ki barhti hui community jo KissanCares par bharosa karti hai." },
    { icon: Award, en: "Expert Guidance", ru: "Maahir Rahnumai", descEn: "Our agronomists help you choose the right products for your crops.", descRu: "Hamare maahir aapki fasal ke liye sahi product chunne mein madad karte hain." },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead title="About Kissan Cares - Pakistan's Trusted Agri Store" description="Learn about KissanCares, Pakistan's trusted online agricultural store based in Sargodha, Punjab." canonical="https://kissancares.com/about" />
      <Header />
      <main className="flex-1 pb-20 lg:pb-0">
        <Breadcrumbs items={[{ label: t("nav.home"), to: "/" }, { label: language === "ru" ? "Hamare Baare Mein" : "About Us" }]} />

        {/* Hero */}
        <section className="bg-gradient-to-br from-primary/5 to-secondary py-12 md:py-16">
          <div className="container text-center max-w-3xl">
            <h1 className="text-2xl md:text-4xl font-extrabold text-foreground mb-4">
              {language === "ru" ? "KissanCares — Pakistan Ka Bharosemand Zar'ai Store" : "KissanCares — Pakistan's Trusted Agricultural Store"}
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              {language === "ru"
                ? "Hum Sargodha, Punjab se operate karte hain aur poore Pakistan ke kissanon ko asli zar'ai products pohanchate hain. Hamara maqsad har kissan ko behtareen quality aur maahir rahnumai faraham karna hai."
                : "Based in Sargodha, Punjab, we deliver authentic agricultural products to farmers across Pakistan. Our mission is to provide every farmer with the best quality products and expert guidance."}
            </p>
          </div>
        </section>

        {/* Values */}
        <section className="py-12">
          <div className="container">
            <h2 className="text-xl font-extrabold text-foreground mb-8 text-center">
              {language === "ru" ? "Hum Kyun Mukhtalif Hain" : "Why We're Different"}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {values.map((v, i) => (
                <div key={i} className="premium-card p-6 text-center">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <v.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-bold text-foreground text-sm mb-2">{language === "ru" ? v.ru : v.en}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{language === "ru" ? v.descRu : v.descEn}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Info */}
        <section className="py-12 bg-secondary/30">
          <div className="container max-w-2xl text-center">
            <h2 className="text-xl font-extrabold text-foreground mb-6">
              {language === "ru" ? "Hamara Pata" : "Our Location"}
            </h2>
            <div className="space-y-3">
              <div className="flex items-center justify-center gap-2 text-sm text-foreground">
                <MapPin className="h-4 w-4 text-primary" /> Sargodha, Punjab, Pakistan
              </div>
              <div className="flex items-center justify-center gap-2 text-sm text-foreground">
                <Phone className="h-4 w-4 text-primary" /> +92 324 028 7276
              </div>
              <div className="flex items-center justify-center gap-2 text-sm text-foreground">
                <Mail className="h-4 w-4 text-primary" /> info@kissancares.com
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFAB />
      <BottomNav />
    </div>
  );
}

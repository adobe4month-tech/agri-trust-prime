import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { useLanguage } from "@/contexts/LanguageContext";
import { MapPin, Phone, Clock } from "lucide-react";

const stores = [
  { city: "Lahore (HQ)", address: "Plot 47, Ferozepur Road, Near Kalma Chowk", phone: "+92 324 0287276", hours: "Mon–Sat 9am–8pm" },
  { city: "Multan", address: "Vehari Chowk, opposite Agriculture University", phone: "+92 324 0287277", hours: "Mon–Sat 9am–7pm" },
  { city: "Faisalabad", address: "Jaranwala Road, Industrial Area", phone: "+92 324 0287278", hours: "Mon–Sat 9am–7pm" },
  { city: "Sargodha", address: "University Road, near Agri Office", phone: "+92 324 0287279", hours: "Mon–Sat 9am–7pm" },
];

export default function Stores() {
  const { language } = useLanguage();
  const t = (en: string, ru: string) => (language === "ru" ? ru : en);
  return (
    <div className="min-h-screen bg-background">
      <SEOHead title="Store Locator — KissanCares" description="Visit our 4 physical stores across Punjab." />
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-2">{t("Our Stores", "Hamare Stores")}</h1>
        <p className="text-muted-foreground mb-8">{t("Visit us in person across Punjab — agronomist consultations are free.", "Punjab bhar mein hamare stores par tashreef laayein — agronomist se free mashwara.")}</p>
        <div className="grid md:grid-cols-2 gap-4">
          {stores.map(s => (
            <div key={s.city} className="bg-card border border-border rounded-2xl p-5 space-y-2">
              <h2 className="font-bold text-lg flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" />{s.city}</h2>
              <p className="text-sm text-muted-foreground">{s.address}</p>
              <p className="text-sm flex items-center gap-2"><Phone className="h-4 w-4 text-primary" />{s.phone}</p>
              <p className="text-sm flex items-center gap-2 text-muted-foreground"><Clock className="h-4 w-4" />{s.hours}</p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}

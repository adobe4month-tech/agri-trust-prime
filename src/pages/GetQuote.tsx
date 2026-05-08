import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageCircle, FileText, ArrowRight, ArrowLeft, Check } from "lucide-react";
import { toast } from "sonner";

const provinces = ["Punjab", "Sindh", "KPK", "Balochistan", "AJK", "Gilgit-Baltistan"];
const citiesByProvince: Record<string, string[]> = {
  Punjab: ["Lahore", "Faisalabad", "Multan", "Sargodha", "Bahawalpur", "Sahiwal", "Rahim Yar Khan", "Gujranwala", "Sialkot"],
  Sindh: ["Karachi", "Hyderabad", "Sukkur", "Larkana", "Nawabshah"],
  KPK: ["Peshawar", "Mardan", "Swabi", "Abbottabad", "Swat"],
  Balochistan: ["Quetta", "Turbat", "Khuzdar", "Zhob"],
  AJK: ["Muzaffarabad", "Mirpur", "Rawalakot"],
  "Gilgit-Baltistan": ["Gilgit", "Skardu", "Hunza"],
};

export default function GetQuote() {
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    products: "", quantity: "", province: "", city: "", deliveryDate: "",
    name: "", phone: "", company: "", type: "",
  });

  const labels = [
    { en: "Products", ru: "Products" },
    { en: "Delivery", ru: "Delivery" },
    { en: "Company", ru: "Company" },
    { en: "Review", ru: "Review" },
  ];

  const next = () => {
    if (step === 1 && !data.products) return toast.error(t1("List products needed", "Products likhein"));
    if (step === 2 && (!data.province || !data.city)) return toast.error(t1("Select location", "Location chunein"));
    if (step === 3 && (!data.name || !data.phone || !data.type)) return toast.error(t1("Fill required fields", "Fields bharein"));
    setStep(s => s + 1);
  };
  const prev = () => setStep(s => s - 1);
  const t1 = (en: string, ru: string) => language === "ru" ? ru : en;

  const submit = () => {
    const msg = encodeURIComponent(`Bulk Quote Request\n\nProducts: ${data.products}\nQty: ${data.quantity}\nDelivery: ${data.city}, ${data.province}\nNeeded by: ${data.deliveryDate}\nBuyer: ${data.name} (${data.type})\nCompany: ${data.company}\nPhone: ${data.phone}`);
    window.open(`https://wa.me/923240287276?text=${msg}`, "_blank");
    navigate("/quote-success");
  };

  const cities = data.province ? citiesByProvince[data.province] || [] : [];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead title="Get Bulk Quote - Kissan Cares" description="Multi-step bulk quote wizard for dealers and B2B." canonical="https://kissancares.com/get-quote" />
      <Header />
      <main className="flex-1 pb-20 lg:pb-0">
        <Breadcrumbs items={[{ label: t("nav.home"), to: "/" }, { label: t1("Get Quote", "Quote Mangwayein") }]} />
        <div className="container py-8 max-w-2xl">
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-3"><FileText className="h-6 w-6 text-primary" /></div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-foreground">{t1("Bulk / Dealer Quote", "Bulk / Dealer Quote")}</h1>
          </div>

          {/* Stepper */}
          <div className="flex items-center justify-between mb-6 max-w-md mx-auto">
            {labels.map((l, i) => {
              const idx = i + 1;
              const done = idx < step;
              const active = idx === step;
              return (
                <div key={i} className="flex items-center flex-1 last:flex-none">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-extrabold ${done ? "bg-primary text-primary-foreground" : active ? "bg-primary/10 text-primary border-2 border-primary" : "bg-secondary text-muted-foreground"}`}>{done ? <Check className="h-4 w-4" /> : idx}</div>
                  {i < labels.length - 1 && <div className={`flex-1 h-0.5 mx-1 ${done ? "bg-primary" : "bg-border"}`} />}
                </div>
              );
            })}
          </div>

          <form onSubmit={e => e.preventDefault()} className="premium-card p-6 space-y-4">
            {step === 1 && (
              <>
                <h2 className="font-extrabold text-lg">{t1("Step 1: Products & Quantities", "Qadam 1: Products aur Miqdar")}</h2>
                <div className="space-y-2"><Label>{t1("Products needed *", "Products *")}</Label><Textarea rows={4} placeholder={t1("List product names...", "Products ke naam likhein...")} value={data.products} onChange={e => setData({ ...data, products: e.target.value })} maxLength={1000} /></div>
                <div className="space-y-2"><Label>{t1("Approx Total Quantity", "Andazan Miqdar")}</Label><Input placeholder="e.g. 500 bottles, 200kg" value={data.quantity} onChange={e => setData({ ...data, quantity: e.target.value })} /></div>
              </>
            )}
            {step === 2 && (
              <>
                <h2 className="font-extrabold text-lg">{t1("Step 2: Delivery Location", "Qadam 2: Delivery Jagah")}</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="space-y-2"><Label>{t1("Province *", "Sooba *")}</Label>
                    <Select value={data.province} onValueChange={v => setData({ ...data, province: v, city: "" })}>
                      <SelectTrigger><SelectValue placeholder={t1("Select", "Chunein")} /></SelectTrigger>
                      <SelectContent>{provinces.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2"><Label>{t1("City *", "Shehar *")}</Label>
                    <Select value={data.city} onValueChange={v => setData({ ...data, city: v })} disabled={!data.province}>
                      <SelectTrigger><SelectValue placeholder={t1("Select", "Chunein")} /></SelectTrigger>
                      <SelectContent>{cities.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2"><Label>{t1("Needed By", "Kab Tak Chahiye")}</Label><Input type="date" value={data.deliveryDate} onChange={e => setData({ ...data, deliveryDate: e.target.value })} /></div>
              </>
            )}
            {step === 3 && (
              <>
                <h2 className="font-extrabold text-lg">{t1("Step 3: Company / Buyer Details", "Qadam 3: Company / Khareedar Tafseel")}</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="space-y-2"><Label>{t1("Name *", "Naam *")}</Label><Input value={data.name} onChange={e => setData({ ...data, name: e.target.value })} maxLength={100} /></div>
                  <div className="space-y-2"><Label>{t1("Phone *", "Phone *")}</Label><Input type="tel" value={data.phone} onChange={e => setData({ ...data, phone: e.target.value })} maxLength={15} /></div>
                </div>
                <div className="space-y-2"><Label>{t1("You Are *", "Aap *")}</Label>
                  <Select value={data.type} onValueChange={v => setData({ ...data, type: v })}>
                    <SelectTrigger><SelectValue placeholder={t1("Select", "Chunein")} /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="farmer">{t1("Farmer", "Kissan")}</SelectItem>
                      <SelectItem value="dealer">{t1("Dealer", "Dealer")}</SelectItem>
                      <SelectItem value="corporate">{t1("Corporate", "Corporate")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2"><Label>{t1("Company Name", "Company Naam")}</Label><Input value={data.company} onChange={e => setData({ ...data, company: e.target.value })} maxLength={100} /></div>
              </>
            )}
            {step === 4 && (
              <>
                <h2 className="font-extrabold text-lg">{t1("Step 4: Review & Submit", "Qadam 4: Dekhein aur Bhejein")}</h2>
                <div className="space-y-2 text-sm bg-secondary/40 rounded-xl p-4">
                  <Row label={t1("Products", "Products")} value={data.products} />
                  <Row label={t1("Quantity", "Miqdar")} value={data.quantity || "—"} />
                  <Row label={t1("Delivery", "Delivery")} value={`${data.city}, ${data.province}`} />
                  <Row label={t1("Needed By", "Kab")} value={data.deliveryDate || "—"} />
                  <Row label={t1("Buyer", "Khareedar")} value={`${data.name} (${data.type})`} />
                  <Row label={t1("Company", "Company")} value={data.company || "—"} />
                  <Row label={t1("Phone", "Phone")} value={data.phone} />
                </div>
              </>
            )}

            <div className="flex gap-2 pt-2">
              {step > 1 && <Button type="button" variant="outline" onClick={prev}><ArrowLeft className="h-4 w-4" />{t1("Back", "Wapas")}</Button>}
              {step < 4 ? (
                <Button type="button" variant="hero" onClick={next} className="ml-auto">{t1("Next", "Aage")}<ArrowRight className="h-4 w-4" /></Button>
              ) : (
                <Button type="button" variant="whatsapp" onClick={submit} className="ml-auto"><MessageCircle className="h-4 w-4" />{t1("Submit & Send to WhatsApp", "Bhejein")}</Button>
              )}
            </div>
          </form>
        </div>
      </main>
      <Footer />
      <WhatsAppFAB />
      <BottomNav />
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return <div className="flex justify-between gap-3"><span className="text-muted-foreground shrink-0">{label}</span><span className="font-semibold text-right break-words">{value}</span></div>;
}

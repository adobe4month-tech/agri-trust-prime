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
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageCircle, Phone, FileText, CheckCircle2 } from "lucide-react";
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
  const [formData, setFormData] = useState({
    name: "", phone: "", type: "", province: "", city: "", products: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.type || !formData.products) {
      toast.error(language === "ru" ? "Tamam zaruri fields bharein" : "Please fill all required fields");
      return;
    }
    setSubmitted(true);
    toast.success(language === "ru" ? "Aapki darkhwast bhej di gayi!" : "Your quote request has been submitted!");
  };

  const handleWhatsAppQuote = () => {
    const msg = encodeURIComponent(
      `Assalam o Alaikum! I need a bulk quote.\n\nName: ${formData.name}\nPhone: ${formData.phone}\nType: ${formData.type}\nLocation: ${formData.city}, ${formData.province}\n\nProducts needed:\n${formData.products}\n\nPlease share pricing.`
    );
    window.open(`https://wa.me/923240287276?text=${msg}`, "_blank");
  };

  const availableCities = formData.province ? citiesByProvince[formData.province] || [] : [];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead title="Get Bulk Quote - Kissan Cares" description="Request bulk pricing for seeds, pesticides, herbicides & fertilizers. Dealers and farmers welcome." canonical="https://kissancares.com/get-quote" />
      <Header />
      <main className="flex-1 pb-20 lg:pb-0">
        <Breadcrumbs items={[{ label: t("nav.home"), to: "/" }, { label: language === "ru" ? "Quote Mangwayein" : "Get Quote" }]} />
        <div className="container py-8 max-w-2xl">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <FileText className="h-7 w-7 text-primary" />
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-foreground mb-2">
              {language === "ru" ? "Bulk / Dealer Quote Mangwayein" : "Request Bulk / Dealer Quote"}
            </h1>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              {language === "ru"
                ? "Zyada miqdar mein khareedna chahte hain? Form bharein ya seedha WhatsApp karein."
                : "Want to buy in bulk? Fill the form or contact us directly on WhatsApp."}
            </p>
          </div>

          {submitted ? (
            <div className="premium-card p-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <CheckCircle2 className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-xl font-extrabold text-foreground">
                {language === "ru" ? "Shukriya! Darkhwast Mil Gayi" : "Thank You! Request Received"}
              </h2>
              <p className="text-sm text-muted-foreground">
                {language === "ru"
                  ? "Hamari team 24 ghanton mein aap se rabta karegi. Ya abhi WhatsApp par baat karein."
                  : "Our team will contact you within 24 hours. Or chat with us on WhatsApp now."}
              </p>
              <Button variant="whatsapp" onClick={handleWhatsAppQuote}>
                <MessageCircle className="h-4 w-4" /> WhatsApp Par Baat Karein
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="premium-card p-6 space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">{language === "ru" ? "Naam *" : "Name *"}</Label>
                  <Input id="name" placeholder={language === "ru" ? "Aapka poora naam" : "Your full name"} value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} maxLength={100} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">{language === "ru" ? "Phone Number *" : "Phone Number *"}</Label>
                  <Input id="phone" type="tel" placeholder="03XX-XXXXXXX" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} maxLength={15} />
                </div>
              </div>

              <div className="space-y-2">
                <Label>{language === "ru" ? "Aap Kaun Hain? *" : "You Are? *"}</Label>
                <Select value={formData.type} onValueChange={v => setFormData({ ...formData, type: v })}>
                  <SelectTrigger><SelectValue placeholder={language === "ru" ? "Chunein..." : "Select..."} /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="farmer">{language === "ru" ? "Kissan (Farmer)" : "Farmer"}</SelectItem>
                    <SelectItem value="dealer">{language === "ru" ? "Dealer / Dukandaar" : "Dealer / Retailer"}</SelectItem>
                    <SelectItem value="corporate">{language === "ru" ? "Corporate / Company" : "Corporate / Company"}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>{language === "ru" ? "Sooba" : "Province"}</Label>
                  <Select value={formData.province} onValueChange={v => setFormData({ ...formData, province: v, city: "" })}>
                    <SelectTrigger><SelectValue placeholder={language === "ru" ? "Sooba chunein" : "Select province"} /></SelectTrigger>
                    <SelectContent>
                      {provinces.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>{language === "ru" ? "Shehar" : "City"}</Label>
                  <Select value={formData.city} onValueChange={v => setFormData({ ...formData, city: v })} disabled={!formData.province}>
                    <SelectTrigger><SelectValue placeholder={language === "ru" ? "Shehar chunein" : "Select city"} /></SelectTrigger>
                    <SelectContent>
                      {availableCities.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="products">{language === "ru" ? "Kaunse Products Chahiye? *" : "Which Products Do You Need? *"}</Label>
                <Textarea
                  id="products"
                  placeholder={language === "ru" ? "Product ka naam, miqdar aur zarurat likhein..." : "Describe the products, quantities and requirements..."}
                  value={formData.products}
                  onChange={e => setFormData({ ...formData, products: e.target.value })}
                  rows={4}
                  maxLength={1000}
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button type="submit" variant="hero" size="lg" className="flex-1">
                  <FileText className="h-4 w-4" /> {language === "ru" ? "Quote Bhejein" : "Submit Quote Request"}
                </Button>
                <Button type="button" variant="whatsapp" size="lg" className="flex-1" onClick={handleWhatsAppQuote}>
                  <MessageCircle className="h-4 w-4" /> {language === "ru" ? "WhatsApp Par Poochein" : "Ask on WhatsApp"}
                </Button>
              </div>

              <div className="flex items-center gap-2 text-xs text-muted-foreground pt-1">
                <Phone className="h-3.5 w-3.5" />
                {language === "ru" ? "Ya seedha call karein: " : "Or call directly: "}
                <a href="tel:+923240287276" className="text-primary font-semibold hover:underline">0324-028-7276</a>
              </div>
            </form>
          )}
        </div>
      </main>
      <Footer />
      <WhatsAppFAB />
      <BottomNav />
    </div>
  );
}

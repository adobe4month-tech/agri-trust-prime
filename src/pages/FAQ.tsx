import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
import WhatsAppFAB from "@/components/WhatsAppFAB";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { MessageCircle, HelpCircle } from "lucide-react";

const faqData = [
  {
    category: { en: "Ordering", ru: "Order Karna" },
    items: [
      {
        q: { en: "How do I place an order?", ru: "Order kaise dein?" },
        a: { en: "Simply browse our products, add items to cart, and proceed to checkout. You can also order via WhatsApp by sending us the product name and your address.", ru: "Products dekhein, cart mein daalein, aur checkout karein. Aap WhatsApp par bhi product ka naam aur address bhej kar order de sakte hain." },
      },
      {
        q: { en: "What payment methods do you accept?", ru: "Payment ka kya tareeqa hai?" },
        a: { en: "We accept Cash on Delivery (COD) across Pakistan, JazzCash, EasyPaisa, and bank transfer.", ru: "Hum Cash on Delivery (COD) lete hain poore Pakistan mein, aur JazzCash, EasyPaisa, aur bank transfer bhi." },
      },
      {
        q: { en: "Is there a minimum order value?", ru: "Kam se kam kitne ka order ho sakta hai?" },
        a: { en: "No minimum order value. You can order even a single product.", ru: "Koi minimum nahi hai. Aap ek product bhi mangwa sakte hain." },
      },
    ],
  },
  {
    category: { en: "Delivery", ru: "Delivery" },
    items: [
      {
        q: { en: "How long does delivery take?", ru: "Delivery mein kitna waqt lagta hai?" },
        a: { en: "Delivery takes 2-5 business days depending on your city. Major cities like Lahore, Faisalabad, and Multan receive orders within 2-3 days.", ru: "Delivery mein 2-5 kaam ke din lagte hain aapke sheher ke mutabiq. Lahore, Faisalabad, Multan jaise bade shehron mein 2-3 din mein milta hai." },
      },
      {
        q: { en: "Do you offer free delivery?", ru: "Kya delivery muft hai?" },
        a: { en: "Yes! Many products have free delivery. Check the product page for the free delivery badge.", ru: "Haan! Bohat se products par muft delivery hai. Product page par 'Free' badge dekhein." },
      },
      {
        q: { en: "Do you deliver to all cities?", ru: "Kya har sheher mein delivery hoti hai?" },
        a: { en: "Yes, we deliver to 120+ cities across Pakistan through TCS and Leopards courier.", ru: "Haan, hum Pakistan ke 120+ shehron mein TCS aur Leopards courier se delivery karte hain." },
      },
    ],
  },
  {
    category: { en: "Returns & Refunds", ru: "Wapsi Aur Refund" },
    items: [
      {
        q: { en: "Can I return a product?", ru: "Kya product wapas ho sakta hai?" },
        a: { en: "Yes, you can return within 7 days if the product is sealed/unused. Contact us on WhatsApp with your order ID.", ru: "Haan, 7 din ke andar wapas kar sakte hain agar product sealed/istemal nahi hua. WhatsApp par order ID bhejein." },
      },
      {
        q: { en: "How long does a refund take?", ru: "Refund mein kitna waqt lagta hai?" },
        a: { en: "Refunds are processed within 3-5 business days after we receive the returned product.", ru: "Product wapas milne ke 3-5 kaam ke dinon mein refund ho jata hai." },
      },
    ],
  },
  {
    category: { en: "Products", ru: "Products" },
    items: [
      {
        q: { en: "Are all products original?", ru: "Kya sab products asli hain?" },
        a: { en: "Yes, 100% guaranteed. We source directly from authorized distributors and every batch is verified.", ru: "Haan, 100% guarantee. Hum seedha authorized distributors se lete hain aur har batch verify karte hain." },
      },
      {
        q: { en: "Can I get expert advice on which product to use?", ru: "Kya maahir se mushwara mil sakta hai?" },
        a: { en: "Absolutely! Our agronomists are available on WhatsApp to help you choose the right product for your crop and problem.", ru: "Bilkul! Hamare maahir WhatsApp par mojood hain — aapki fasal aur masle ke liye sahi product batayenge." },
      },
      {
        q: { en: "Do you check product expiry dates?", ru: "Kya expiry date check hoti hai?" },
        a: { en: "Yes, every product is expiry-checked before shipping. We never send expired or near-expiry products.", ru: "Haan, har product ship karne se pehle expiry check hoti hai. Hum kabhi expired ya qareeb-e-expiry product nahi bhejte." },
      },
    ],
  },
];

export default function FAQ() {
  const { language, t } = useLanguage();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqData.flatMap(cat => cat.items.map(item => ({
      "@type": "Question",
      name: item.q.en,
      acceptedAnswer: { "@type": "Answer", text: item.a.en },
    }))),
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title="FAQ - Frequently Asked Questions"
        description="Find answers to common questions about ordering, delivery, returns, and products at Kissan Cares. Available in English and Roman Urdu."
        canonical="https://kissancares.com/faq"
        jsonLd={jsonLd}
      />
      <Header />

      <main className="flex-1 pb-20 lg:pb-0">
        <Breadcrumbs items={[{ label: t("nav.home"), to: "/" }, { label: "FAQ" }]} />

        <div className="container max-w-3xl py-4">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <HelpCircle className="h-7 w-7 text-primary" />
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-foreground">{t("faq.title")}</h1>
            <p className="text-sm text-muted-foreground mt-2">{t("faq.subtitle")}</p>
          </div>

          {/* FAQ sections */}
          <div className="space-y-8">
            {faqData.map((section, si) => (
              <div key={si}>
                <h2 className="text-sm font-bold text-primary uppercase tracking-wider mb-3">
                  {language === "ru" ? section.category.ru : section.category.en}
                </h2>
                <Accordion type="single" collapsible className="premium-card divide-y divide-border/50">
                  {section.items.map((item, qi) => (
                    <AccordionItem key={qi} value={`${si}-${qi}`} className="border-0">
                      <AccordionTrigger className="px-5 py-4 text-sm font-semibold text-foreground hover:text-primary hover:no-underline">
                        {language === "ru" ? item.q.ru : item.q.en}
                      </AccordionTrigger>
                      <AccordionContent className="px-5 pb-4 text-sm text-muted-foreground leading-relaxed">
                        {language === "ru" ? item.a.ru : item.a.en}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-12 premium-card p-8 text-center bg-primary/5">
            <p className="text-base font-bold text-foreground mb-2">{t("faq.still")}</p>
            <p className="text-sm text-muted-foreground mb-4">
              {language === "ru" ? "Hamare maahir WhatsApp par mojood hain" : "Our experts are available on WhatsApp"}
            </p>
            <Button asChild variant="whatsapp" size="lg">
              <a href="https://wa.me/923240287276" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-4 w-4" /> {t("faq.askWhatsApp")}
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

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";
import { useLanguage } from "@/contexts/LanguageContext";
import { Shield, Truck, RotateCcw, FileText } from "lucide-react";

const sections = [
  {
    id: "privacy",
    icon: Shield,
    titleEn: "Privacy Policy",
    titleRu: "Privacy Policy",
    contentEn: [
      "Kissan Cares respects your privacy. We collect your name, phone number, email, and delivery address solely for order processing and delivery purposes.",
      "We do not sell, rent, or share your personal information with third parties except as necessary to fulfill your order (e.g., courier services).",
      "Your payment information is processed securely. We do not store credit/debit card details on our servers.",
      "We may use your contact information to send order updates via SMS or WhatsApp. You can opt out at any time.",
      "Cookies are used to improve your browsing experience and remember your preferences (language, recently viewed products).",
    ],
    contentRu: [
      "Kissan Cares aapki privacy ka khayal rakhta hai. Hum sirf order processing aur delivery ke liye aapka naam, phone, email aur address lete hain.",
      "Hum aapki information kisi teesri party ko nahi bechte ya share nahi karte, siway courier service ke jo delivery ke liye zaroori hai.",
      "Aapki payment information mehfooz tareeqe se process hoti hai. Hum card details apne server par save nahi karte.",
      "Hum aapke contact par SMS ya WhatsApp se order updates bhej sakte hain. Aap kabhi bhi band karwa sakte hain.",
      "Cookies aapke browsing experience ko behtar banane ke liye use hoti hain (language, recently viewed products).",
    ],
  },
  {
    id: "shipping",
    icon: Truck,
    titleEn: "Shipping Policy",
    titleRu: "Shipping Policy",
    contentEn: [
      "We deliver to all cities across Pakistan through trusted courier partners (TCS, Leopards, Pakistan Post).",
      "Standard delivery takes 2-5 business days depending on your location. Remote areas may take 5-7 days.",
      "Free delivery is available on select products and orders above Rs. 2,000.",
      "You will receive a tracking number via SMS/WhatsApp once your order is dispatched.",
      "Cash on Delivery (COD) is available nationwide. Advance payment options include JazzCash, EasyPaisa, and bank transfer.",
    ],
    contentRu: [
      "Hum poore Pakistan mein bharosemand courier partners (TCS, Leopards, Pakistan Post) ke zariye deliver karte hain.",
      "Standard delivery 2-5 kaam ke dinon mein hoti hai. Door daraz ilaaqon mein 5-7 din lag sakte hain.",
      "Muft delivery kuch products aur Rs. 2,000 se upar ke orders par milti hai.",
      "Order dispatch hone par aapko SMS/WhatsApp par tracking number milega.",
      "Cash on Delivery (COD) poore mulk mein available hai. Advance payment JazzCash, EasyPaisa, aur bank transfer se ho sakti hai.",
    ],
  },
  {
    id: "returns",
    icon: RotateCcw,
    titleEn: "Return & Refund Policy",
    titleRu: "Wapsi Aur Refund Policy",
    contentEn: [
      "We guarantee 100% original products. If you receive a damaged, expired, or wrong product, we will replace or refund it.",
      "Return requests must be made within 3 days of receiving the order. Contact us via WhatsApp with photos of the issue.",
      "Opened or used products cannot be returned unless they are defective or incorrect.",
      "Refunds are processed within 5-7 business days to your original payment method or as store credit.",
      "Shipping costs for returns due to our error are covered by Kissan Cares. Customer-initiated returns may incur shipping charges.",
    ],
    contentRu: [
      "Hum 100% asli products ki guarantee dete hain. Agar damage, expired, ya ghalat product mile to hum replace ya refund karenge.",
      "Wapsi ki darkhwast order milne ke 3 din ke andar karni hogi. WhatsApp par photos ke saath rabta karein.",
      "Khule ya istemaal shuda products wapas nahi ho sakte, jab tak kharaab ya ghalat na hon.",
      "Refund 5-7 kaam ke dinon mein aapke original payment method ya store credit mein hoga.",
      "Hamari ghalti ki wajah se wapsi ki shipping cost Kissan Cares uthayega. Customer ki taraf se wapsi par shipping charges lag sakte hain.",
    ],
  },
  {
    id: "terms",
    icon: FileText,
    titleEn: "Terms of Use",
    titleRu: "Istemaal Ki Sharait",
    contentEn: [
      "By using kissancares.com, you agree to these terms and conditions.",
      "All product images and descriptions are for reference. Actual products may vary slightly in packaging.",
      "Prices are subject to change without prior notice. The price at the time of order placement will be honored.",
      "We reserve the right to cancel any order if the product is out of stock or if we suspect fraudulent activity.",
      "Product recommendations on this website are for informational purposes. Always consult a local agronomist for specific crop advice.",
      "Kissan Cares is not liable for crop damage resulting from improper product usage. Always follow label instructions.",
    ],
    contentRu: [
      "kissancares.com istemal karne se aap in sharait se mutafiq hain.",
      "Tamam product images aur descriptions reference ke liye hain. Asli products packaging mein thoda farq ho sakta hai.",
      "Qeemtein baghair aagahi tabdeel ho sakti hain. Order ki waqt ki qeemat laagoo hogi.",
      "Hum kisi bhi order ko radd kar sakte hain agar product stock mein na ho ya dhoka dahi ka shubha ho.",
      "Is website par product ki sifarishat malumat ke liye hain. Khaas fasal ke mashware ke liye maqami maahir se rabta karein.",
      "Kissan Cares ghalat istemal se fasal ke nuqsaan ka zimmedaar nahi. Hamesha label ki hidaayaat par amal karein.",
    ],
  },
];

export default function Privacy() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead title="Privacy Policy, Shipping & Returns - Kissan Cares" description="Read our privacy policy, shipping details, return policy and terms of use." canonical="https://kissancares.com/privacy" />
      <Header />
      <main className="flex-1 pb-20 lg:pb-0">
        <Breadcrumbs items={[{ label: language === "ru" ? "Home" : "Home", to: "/" }, { label: language === "ru" ? "Policies" : "Policies" }]} />
        <div className="container py-8 max-w-3xl">
          <h1 className="text-2xl md:text-3xl font-extrabold text-foreground mb-2 text-center">
            {language === "ru" ? "Hamari Policies" : "Our Policies"}
          </h1>
          <p className="text-sm text-muted-foreground text-center mb-8">
            {language === "ru" ? "Aakhri baar update: April 2026" : "Last updated: April 2026"}
          </p>

          {/* Quick nav */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {sections.map(s => (
              <a key={s.id} href={`#${s.id}`} className="text-xs font-semibold px-3 py-1.5 rounded-full bg-secondary text-foreground hover:bg-primary/10 hover:text-primary transition-colors">
                {language === "ru" ? s.titleRu : s.titleEn}
              </a>
            ))}
          </div>

          <div className="space-y-8">
            {sections.map(s => (
              <section key={s.id} id={s.id} className="premium-card p-6 scroll-mt-24">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <s.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="text-lg font-extrabold text-foreground">{language === "ru" ? s.titleRu : s.titleEn}</h2>
                </div>
                <div className="space-y-3">
                  {(language === "ru" ? s.contentRu : s.contentEn).map((para, i) => (
                    <p key={i} className="text-sm text-foreground/80 leading-relaxed pl-4 border-l-2 border-border">{para}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
}

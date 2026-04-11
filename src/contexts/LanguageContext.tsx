import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "en" | "ru";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Roman Urdu translations
const translations: Record<string, Record<Language, string>> = {
  // Navigation
  "nav.home": { en: "Home", ru: "Home" },
  "nav.seeds": { en: "Seeds", ru: "Beej" },
  "nav.pesticides": { en: "Pesticides", ru: "Keeron Ki Dawa" },
  "nav.herbicides": { en: "Herbicides", ru: "Jari Booti Ki Dawa" },
  "nav.fertilizers": { en: "Fertilizers", ru: "Khaadein" },
  "nav.brands": { en: "Brands", ru: "Brands" },
  "nav.education": { en: "Kissan Education", ru: "Kissan Taleem" },
  "nav.track": { en: "Track Order", ru: "Order Track Karein" },

  // Hero
  "hero.badge": { en: "100% Verified Products", ru: "100% Asli Products" },
  "hero.slide1.title": { en: "Spring Season Sale", ru: "Bahar Ka Season Sale" },
  "hero.slide1.accent": { en: "Up to 30% Off", ru: "30% Tak Discount" },
  "hero.slide1.subtitle": { en: "Premium seeds, pesticides & herbicides for the Kharif season", ru: "Kharif season ke liye behtareen beej, dawaiyan aur jari booti ki dawa" },
  "hero.slide1.cta": { en: "Shop Sale", ru: "Sale Dekhein" },
  "hero.slide2.title": { en: "Pakistan's Trusted", ru: "Pakistan Ka Bharosemand" },
  "hero.slide2.accent": { en: "Agri Store", ru: "Zar'ai Store" },
  "hero.slide2.subtitle": { en: "100% original products from 35+ top agricultural brands", ru: "35+ top brands se 100% asli products" },
  "hero.slide2.cta": { en: "Explore Products", ru: "Products Dekhein" },
  "hero.slide3.title": { en: "Free Delivery on", ru: "Muft Delivery" },
  "hero.slide3.accent": { en: "1000+ Products", ru: "1000+ Products Par" },
  "hero.slide3.subtitle": { en: "Nationwide delivery with Cash on Delivery available", ru: "Poore Pakistan mein delivery, ghar par payment" },
  "hero.slide3.cta": { en: "Shop Now", ru: "Abhi Khareedein" },
  "hero.talk": { en: "Talk to Agronomist", ru: "Maahir Se Baat Karein" },

  // Quick categories
  "quick.label": { en: "Quick:", ru: "Jaldi:" },

  // Section headings
  "section.browseByCrop": { en: "Browse by Crop", ru: "Fasal Ke Mutabiq" },
  "section.shopByCrop": { en: "Shop by", ru: "Khareedein" },
  "section.cropType": { en: "Crop Type", ru: "Fasal Ke Mutabiq" },
  "section.findSolutions": { en: "Find Solutions", ru: "Hal Dhundhein" },
  "section.shopByProblem": { en: "Shop by", ru: "Masle Ke Mutabiq" },
  "section.problem": { en: "Problem", ru: "Masla" },
  "section.explore": { en: "Explore", ru: "Dekhein" },
  "section.products": { en: "Products", ru: "Products" },
  "section.weeklySale": { en: "Weekly Sale", ru: "Hafta War Sale" },
  "section.latestProducts": { en: "Latest Products", ru: "Naye Products" },
  "section.viewAll": { en: "View All", ru: "Sab Dekhein" },
  "section.ourImpact": { en: "Our Impact", ru: "Hamara Asar" },
  "section.trustedBy": { en: "Trusted by", ru: "Bharosa Karte Hain" },
  "section.farmersAcross": { en: "Farmers Across Pakistan", ru: "Poore Pakistan Ke Kissan" },
  "section.whatFarmersSay": { en: "What", ru: "Kissanon Ki" },
  "section.farmersSay": { en: "Farmers Say", ru: "Raaye" },
  "section.happyFarmers": { en: "Happy Farmers", ru: "Khush Kissan" },
  "section.productsDelivered": { en: "Products Delivered", ru: "Products Pohanchaye" },
  "section.citiesCovered": { en: "Cities Covered", ru: "Sheher" },

  // Trust bar
  "trust.original": { en: "100% Original", ru: "100% Asli" },
  "trust.cod": { en: "Cash on Delivery", ru: "Ghar Par Payment" },
  "trust.delivery": { en: "Nationwide Delivery", ru: "Poore Pakistan Delivery" },
  "trust.verified": { en: "Agronomist Verified", ru: "Maahir Tasdeeq Shuda" },
  "trust.brands": { en: "35+ Top Brands", ru: "35+ Brands" },
  "trust.support": { en: "Expert Support", ru: "Maahir Madad" },
  "trust.freeDelivery": { en: "Free Delivery", ru: "Muft Delivery" },

  // Product card
  "product.sold": { en: "Sold", ru: "Bik Chuke" },
  "product.addToCart": { en: "Add to Cart", ru: "Cart Mein Daalein" },
  "product.free": { en: "Free", ru: "Muft" },
  "product.watching": { en: "watching", ru: "dekh rahe hain" },
  "product.inStock": { en: "In Stock", ru: "Dastiyab Hai" },
  "product.shipsIn24": { en: "Ships in 24hrs", ru: "24 Ghante Mein Ship" },
  "product.qty": { en: "Qty:", ru: "Miqdar:" },
  "product.askAgronomist": { en: "Ask Agronomist", ru: "Maahir Se Poochein" },
  "product.techSpecs": { en: "Technical Specifications", ru: "Technical Tafseel" },
  "product.customerReviews": { en: "Customer Reviews", ru: "Kissanon Ki Raaye" },
  "product.relatedProducts": { en: "Related Products", ru: "Mutaliqa Products" },
  "product.firstPurchase": { en: "First Purchase? Use code", ru: "Pehli Khareed? Code Istemal Karein" },
  "product.forDiscount": { en: "for 10% off!", ru: "aur 10% discount paayein!" },

  // Stock urgency
  "product.onlyLeft": { en: "Only", ru: "Sirf" },
  "product.left": { en: "left!", ru: "Baqi Hain!" },

  // Delivery estimate
  "delivery.title": { en: "Delivery Estimate", ru: "Delivery Ka Andaza" },
  "delivery.selectCity": { en: "Select your city", ru: "Apna sheher chunein" },
  "delivery.days": { en: "days delivery", ru: "din mein delivery" },

  // Share
  "share.title": { en: "Share this product", ru: "Yeh product share karein" },
  "share.whatsapp": { en: "WhatsApp", ru: "WhatsApp" },
  "share.copy": { en: "Copy Link", ru: "Link Copy Karein" },
  "share.copied": { en: "Link copied!", ru: "Link copy ho gaya!" },

  // Cross-sell
  "crossSell.title": { en: "Buy These Together", ru: "Is Ke Saath Yeh Bhi Lein" },

  // Urgency banner
  "urgency.deal": { en: "Today's Deal:", ru: "Aaj Ki Deal:" },
  "urgency.only": { en: "Only", ru: "Sirf" },
  "urgency.code": { en: "Code:", ru: "Code:" },

  // Recently viewed
  "recent.title": { en: "Recently Viewed", ru: "Haal Hi Mein Dekhe" },

  // Social proof
  "social.justOrdered": { en: "just ordered", ru: "ne abhi order kiya" },
  "social.minAgo": { en: "min ago", ru: "min pehle" },

  // Footer
  "footer.quickLinks": { en: "Quick Links", ru: "Tez Links" },
  "footer.categories": { en: "Categories", ru: "Iqsaam" },
  "footer.contactUs": { en: "Contact Us", ru: "Rabta Karein" },
  "footer.helpCenter": { en: "Help Center", ru: "Madad Center" },
  "footer.copyright": { en: "© 2026 Kissan Cares. All rights reserved.", ru: "© 2026 Kissan Cares. Tamam Haqooq Mehfooz." },
  "footer.trustedBy": { en: "Secure Payments • Trusted by 12,500+ Farmers", ru: "Mehfooz Payment • 12,500+ Kissanon Ka Bharosa" },

  // Education
  "edu.hero": { en: "Kissan Education", ru: "Kissan Taleem" },
  "edu.heroSub": { en: "Learn to grow better crops with expert guidance", ru: "Maahireen ki rahnumai se behtar fasal ugayein" },
  "edu.all": { en: "All", ru: "Sab" },
  "edu.cropGuides": { en: "Crop Guides", ru: "Fasal Guide" },
  "edu.pestDisease": { en: "Pest & Disease", ru: "Keere Aur Bimari" },
  "edu.seasonal": { en: "Seasonal Tips", ru: "Mausami Tips" },
  "edu.productGuides": { en: "Product Guides", ru: "Product Guide" },
  "edu.readMore": { en: "Read Full Article", ru: "Poora Parrhein" },
  "edu.readTime": { en: "min read", ru: "min parrhne ka waqt" },
  "edu.relatedProducts": { en: "Products Mentioned", ru: "Zikr Kiye Gaye Products" },
  "edu.popular": { en: "Popular Articles", ru: "Mashhoor Mazameen" },
  "edu.askWhatsApp": { en: "Have a question? Ask on WhatsApp", ru: "Koi sawal? WhatsApp par poochein" },

  // FAQ
  "faq.title": { en: "Frequently Asked Questions", ru: "Aksar Pooche Jaane Wale Sawaal" },
  "faq.subtitle": { en: "Find answers to common questions", ru: "Aam sawaalon ke jawaab yahan paayein" },
  "faq.still": { en: "Still have questions?", ru: "Abhi bhi sawaal hain?" },
  "faq.askWhatsApp": { en: "Ask on WhatsApp", ru: "WhatsApp Par Poochein" },

  // Sell with us
  "sell.hero": { en: "Sell Your Products Across Pakistan", ru: "Apni Products Poore Pakistan Mein Bechein" },
  "sell.heroSub": { en: "Partner with KissanCares and reach 12,500+ farmers", ru: "KissanCares ke saath milein aur 12,500+ kissanon tak pohanchein" },
  "sell.howItWorks": { en: "How It Works", ru: "Yeh Kaise Kaam Karta Hai" },
  "sell.cta": { en: "Start Selling on WhatsApp", ru: "WhatsApp Par Baat Karein" },
  "sell.callUs": { en: "Or call us:", ru: "Ya call karein:" },

  // Track order
  "track.title": { en: "Track Your Order", ru: "Apna Order Track Karein" },
  "track.orderId": { en: "Order ID", ru: "Order ID" },
  "track.phone": { en: "Phone Number", ru: "Phone Number" },
  "track.button": { en: "Track Order", ru: "Track Karein" },
  "track.help": { en: "Need help? Contact us on WhatsApp", ru: "Madad chahiye? WhatsApp par baat karein" },
  "track.placed": { en: "Order Placed", ru: "Order Ho Gaya" },
  "track.processing": { en: "Processing", ru: "Tayyar Ho Raha Hai" },
  "track.shipped": { en: "Shipped", ru: "Bhej Diya Gaya" },
  "track.delivered": { en: "Delivered", ru: "Mil Gaya" },

  // 404
  "404.title": { en: "Page Not Found", ru: "Page Nahi Mila" },
  "404.subtitle": { en: "Oops! The page you're looking for doesn't exist.", ru: "Maaf karein! Yeh page mojood nahi hai." },
  "404.home": { en: "Go Home", ru: "Home Jaayein" },
  "404.products": { en: "Browse Products", ru: "Products Dekhein" },
  "404.popular": { en: "Popular Products", ru: "Mashhoor Products" },

  // Common
  "common.home": { en: "Home", ru: "Home" },
  "common.search": { en: "Search", ru: "Talaash" },
  "common.categories": { en: "Categories", ru: "Iqsaam" },
  "common.cart": { en: "Cart", ru: "Cart" },
  "common.account": { en: "Account", ru: "Account" },
  "common.verifiedPurchase": { en: "Verified Purchase", ru: "Tasdeeq Shuda" },
  "common.order": { en: "Order", ru: "Order" },

  // Brands
  "brands.trusted": { en: "Trusted Brands We Carry", ru: "Hamari Bharosemand Brands" },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem("kc-lang");
    return (saved === "ru" ? "ru" : "en") as Language;
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("kc-lang", lang);
  };

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
}

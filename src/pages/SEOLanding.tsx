import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ProductCard from "@/components/ProductCard";
import { products, brands } from "@/data/mockData";
import { useLanguage } from "@/contexts/LanguageContext";

type Mode = "category" | "brand" | "crop" | "problem";

interface Props { mode: Mode; }

const labels: Record<string, { en: string; ru: string }> = {
  pesticide: { en: "Pesticides", ru: "Pesticides" },
  fertilizer: { en: "Fertilizers", ru: "Khaad" },
  seed: { en: "Seeds", ru: "Beej" },
  herbicide: { en: "Herbicides", ru: "Jari Booti ki Dawai" },
  machinery: { en: "Machinery", ru: "Machinery" },
};

export default function SEOLanding({ mode }: Props) {
  const { slug = "" } = useParams();
  const { language } = useLanguage();
  const t = (en: string, ru: string) => (language === "ru" ? ru : en);
  const norm = slug.toLowerCase().replace(/-/g, " ");

  let filtered = products;
  let title = "";
  let intro = "";

  if (mode === "category") {
    filtered = products.filter(p => p.category === slug);
    const l = labels[slug];
    title = l ? l[language === "ru" ? "ru" : "en"] : slug;
    intro = t(`Browse premium ${title.toLowerCase()} sourced from authorized brands. COD available, nationwide delivery.`,
              `${title} ke liye behtareen products. COD available, Pakistan bhar delivery.`);
  } else if (mode === "brand") {
    const brand = brands.find(b => b.toLowerCase().replace(/[^a-z0-9]+/g, "-") === slug) || slug;
    filtered = products.filter(p => p.brand.toLowerCase().replace(/[^a-z0-9]+/g, "-") === slug);
    title = brand;
    intro = t(`Authentic ${brand} products, batch-verified and direct from authorized distributors.`,
              `Asli ${brand} products, distributors se direct.`);
  } else if (mode === "crop") {
    filtered = products.filter(p => p.targetCrops?.some(c => c.toLowerCase() === norm));
    title = slug.charAt(0).toUpperCase() + slug.slice(1);
    intro = t(`Best inputs for ${title} cultivation — pesticides, fertilizers and seeds recommended by agronomists.`,
              `${title} ki kashtkaari ke liye behtareen products.`);
  } else {
    filtered = products.filter(p => p.targetProblems?.some(c => c.toLowerCase() === norm));
    title = slug.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase());
    intro = t(`Effective solutions for ${title} — agronomist verified.`,
              `${title} ka asar dar ilaj.`);
  }

  return (
    <div className="min-h-screen bg-background">
      <SEOHead title={`${title} — KissanCares`} description={intro} canonical={`/${mode}/${slug}`} />
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <nav className="text-xs text-muted-foreground mb-3"><Link to="/" className="hover:text-primary">Home</Link> / {mode} / <span className="text-foreground">{title}</span></nav>
        <h1 className="text-3xl md:text-4xl font-extrabold mb-2">{title}</h1>
        <p className="text-muted-foreground mb-6">{intro}</p>
        <p className="text-sm text-muted-foreground mb-6">{filtered.length} {t("products", "products")}</p>
        {filtered.length === 0 ? (
          <div className="text-center py-20 bg-card border border-border rounded-2xl">
            <p className="text-muted-foreground">{t("No products yet in this collection.", "Iss collection mein abhi products nahi.")}</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
import WhatsAppFAB from "@/components/WhatsAppFAB";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";
import { useLanguage } from "@/contexts/LanguageContext";
import { blogPosts, type BlogPost } from "@/data/blogData";
import { Calendar, Clock, ArrowRight, BookOpen, Search } from "lucide-react";
import { useScrollReveal } from "@/hooks/useAnimations";

const categories = [
  { key: "all", en: "All", ru: "Sab" },
  { key: "crop-guides", en: "Crop Guides", ru: "Fasal Guide" },
  { key: "pest-disease", en: "Pest & Disease", ru: "Keere Aur Bimari" },
  { key: "seasonal", en: "Seasonal Tips", ru: "Mausami Tips" },
  { key: "product-guides", en: "Product Guides", ru: "Product Guide" },
];

function BlogCard({ post }: { post: BlogPost }) {
  const { language, t } = useLanguage();
  const title = language === "ru" ? post.titleUrdu : post.title;
  const excerpt = language === "ru" ? post.excerptUrdu : post.excerpt;

  return (
    <Link to={`/education/${post.slug}`} className="premium-card group block overflow-hidden">
      <div className="aspect-video overflow-hidden bg-secondary/50">
        <img
          src={post.image}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded-md">
            {categories.find(c => c.key === post.category)?.[language === "ru" ? "ru" : "en"] || post.category}
          </span>
          <span className="text-[10px] text-muted-foreground flex items-center gap-0.5">
            <Clock className="h-2.5 w-2.5" /> {post.readTime} {t("edu.readTime")}
          </span>
        </div>
        <h3 className="text-sm font-bold text-foreground leading-snug line-clamp-2 mb-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed mb-3">{excerpt}</p>
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-muted-foreground flex items-center gap-1">
            <Calendar className="h-3 w-3" /> {new Date(post.date).toLocaleDateString("en-PK", { day: "numeric", month: "short", year: "numeric" })}
          </span>
          <span className="text-xs font-semibold text-primary flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            {t("edu.readMore")} <ArrowRight className="h-3 w-3" />
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function Education() {
  const { language, t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const ref = useScrollReveal();

  const filtered = blogPosts.filter(post => {
    const matchesCategory = activeCategory === "all" || post.category === activeCategory;
    const matchesSearch = searchQuery === "" ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.titleUrdu.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title="Kissan Education - Agricultural Guides & Tips"
        description="Expert agricultural guides in Roman Urdu and English. Learn about crop care, pest control, seasonal tips, and product usage for Pakistani farmers."
        canonical="https://kissancares.com/education"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "Kissan Education",
          description: "Agricultural education hub for Pakistani farmers",
          publisher: { "@type": "Organization", name: "Kissan Cares" },
        }}
      />
      <Header />

      <main className="flex-1 pb-20 lg:pb-0">
        {/* Hero */}
        <div className="bg-gradient-to-br from-agri-deep via-agri-mid to-agri-deep relative overflow-hidden">
          <div className="absolute inset-0 bg-mesh opacity-30" />
          <div className="container py-12 md:py-16 relative">
            <div className="flex items-center gap-3 mb-4" style={{ animation: "fade-up 0.5s ease-out both" }}>
              <div className="w-12 h-12 rounded-xl bg-primary-foreground/10 backdrop-blur-sm flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-agri-gold" />
              </div>
              <div>
                <h1 className="text-2xl md:text-4xl font-extrabold text-primary-foreground">{t("edu.hero")}</h1>
                <p className="text-sm text-primary-foreground/60">{t("edu.heroSub")}</p>
              </div>
            </div>

            {/* Search */}
            <div className="max-w-md mt-6" style={{ animation: "fade-up 0.5s ease-out 0.1s both" }}>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary-foreground/40" />
                <input
                  type="text"
                  placeholder={language === "ru" ? "Mazameen talaash karein..." : "Search articles..."}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-10 pl-10 pr-4 rounded-xl bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground text-sm placeholder:text-primary-foreground/40 focus:outline-none focus:ring-2 focus:ring-agri-gold/30"
                />
              </div>
            </div>
          </div>
        </div>

        <Breadcrumbs items={[{ label: t("nav.home"), to: "/" }, { label: t("edu.hero") }]} />

        {/* Category tabs */}
        <div className="container mb-6">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide py-2">
            {categories.map(cat => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`shrink-0 px-4 py-2 rounded-full text-xs font-semibold transition-colors duration-200 ${
                  activeCategory === cat.key
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-primary/10"
                }`}
              >
                {language === "ru" ? cat.ru : cat.en}
              </button>
            ))}
          </div>
        </div>

        {/* Blog grid */}
        <div ref={ref} className="container reveal-section">
          <p className="text-sm text-muted-foreground mb-4 font-medium">
            {filtered.length} {language === "ru" ? "mazameen" : "articles"}
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 stagger-children revealed">
            {filtered.map(post => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <BookOpen className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" />
              <p className="text-muted-foreground font-medium">
                {language === "ru" ? "Koi mazmoon nahi mila" : "No articles found"}
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
      <WhatsAppFAB />
      <BottomNav />
    </div>
  );
}

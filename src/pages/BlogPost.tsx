import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
import WhatsAppFAB from "@/components/WhatsAppFAB";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";
import ProductCard from "@/components/ProductCard";
import { useLanguage } from "@/contexts/LanguageContext";
import { blogPosts } from "@/data/blogData";
import { products } from "@/data/mockData";
import { Calendar, Clock, User, ArrowLeft, MessageCircle, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BlogPost() {
  const { slug } = useParams();
  const { language, t } = useLanguage();
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container py-20 text-center">
          <BookOpen className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-4">
            {language === "ru" ? "Mazmoon nahi mila" : "Article Not Found"}
          </h2>
          <Link to="/education" className="text-primary hover:underline">
            {language === "ru" ? "Wapas Education par jayein" : "Back to Education"}
          </Link>
        </main>
        <Footer />
        <BottomNav />
      </div>
    );
  }

  const title = language === "ru" ? post.titleUrdu : post.title;
  const content = language === "ru" ? post.contentUrdu : post.content;
  const relatedProducts = products.filter(p => post.relatedProductIds.includes(p.id));
  const otherPosts = blogPosts.filter(p => p.id !== post.id).slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title={post.title}
        description={post.excerpt}
        canonical={`https://kissancares.com/education/${post.slug}`}
        ogImage={post.image}
        ogType="article"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: post.title,
          description: post.excerpt,
          image: post.image,
          datePublished: post.date,
          author: { "@type": "Person", name: post.author },
          publisher: { "@type": "Organization", name: "Kissan Cares" },
        }}
      />
      <Header />

      <main className="flex-1 pb-20 lg:pb-0">
        <Breadcrumbs items={[
          { label: t("nav.home"), to: "/" },
          { label: t("edu.hero"), to: "/education" },
          { label: title },
        ]} />

        <div className="container">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Article */}
            <article className="lg:col-span-2" style={{ animation: "fade-up 0.4s ease-out both" }}>
              {/* Hero image */}
              <div className="aspect-video rounded-xl overflow-hidden mb-6">
                <img src={post.image} alt={title} className="w-full h-full object-cover" />
              </div>

              {/* Meta */}
              <div className="flex items-center gap-4 flex-wrap mb-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><User className="h-3 w-3" /> {post.author}</span>
                <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {new Date(post.date).toLocaleDateString("en-PK", { day: "numeric", month: "long", year: "numeric" })}</span>
                <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {post.readTime} {t("edu.readTime")}</span>
              </div>

              <h1 className="text-2xl md:text-3xl font-extrabold text-foreground leading-tight mb-6">{title}</h1>

              {/* Content — rendered from markdown-like text */}
              <div className="prose prose-sm max-w-none text-foreground/80">
                {content.split("\n").map((line, i) => {
                  if (line.startsWith("## ")) return <h2 key={i} className="text-lg font-extrabold text-foreground mt-8 mb-3">{line.replace("## ", "")}</h2>;
                  if (line.startsWith("### ")) return <h3 key={i} className="text-base font-bold text-foreground mt-6 mb-2">{line.replace("### ", "")}</h3>;
                  if (line.startsWith("**") && line.endsWith("**")) return <p key={i} className="font-bold text-foreground mt-3 mb-1">{line.replace(/\*\*/g, "")}</p>;
                  if (line.startsWith("- ")) return <li key={i} className="ml-4 text-sm leading-relaxed list-disc">{line.replace("- ", "")}</li>;
                  if (line.match(/^\d+\./)) return <li key={i} className="ml-4 text-sm leading-relaxed list-decimal">{line.replace(/^\d+\.\s*/, "")}</li>;
                  if (line.trim() === "") return <br key={i} />;
                  return <p key={i} className="text-sm leading-relaxed mb-2">{line}</p>;
                })}
              </div>

              {/* Related Products */}
              {relatedProducts.length > 0 && (
                <div className="mt-10 pt-8 border-t border-border/50">
                  <h3 className="text-lg font-extrabold text-foreground mb-4">{t("edu.relatedProducts")}</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {relatedProducts.map(p => (
                      <ProductCard key={p.id} product={p} />
                    ))}
                  </div>
                </div>
              )}

              {/* WhatsApp CTA */}
              <div className="mt-8 premium-card p-6 text-center bg-primary/5">
                <p className="text-sm font-bold text-foreground mb-3">{t("edu.askWhatsApp")}</p>
                <Button asChild variant="whatsapp" size="lg">
                  <a href="https://wa.me/923240287276" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="h-4 w-4" /> WhatsApp
                  </a>
                </Button>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="space-y-6">
              {/* Popular articles */}
              <div className="premium-card p-5">
                <h4 className="text-sm font-bold text-foreground mb-4">{t("edu.popular")}</h4>
                <div className="space-y-3">
                  {otherPosts.map(p => (
                    <Link key={p.id} to={`/education/${p.slug}`} className="flex gap-3 group">
                      <img src={p.image} alt="" className="w-16 h-12 rounded-lg object-cover shrink-0" />
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                          {language === "ru" ? p.titleUrdu : p.title}
                        </p>
                        <p className="text-[10px] text-muted-foreground mt-0.5">{p.readTime} {t("edu.readTime")}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* WhatsApp sidebar CTA */}
              <div className="premium-card p-5 bg-whatsapp/5">
                <p className="text-sm font-bold text-foreground mb-2">{t("edu.askWhatsApp")}</p>
                <Button asChild variant="whatsapp" size="sm" className="w-full">
                  <a href="https://wa.me/923240287276" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
                  </a>
                </Button>
              </div>

              {/* Back */}
              <Link to="/education" className="flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors">
                <ArrowLeft className="h-4 w-4" /> {language === "ru" ? "Tamam Mazameen" : "All Articles"}
              </Link>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppFAB />
      <BottomNav />
    </div>
  );
}

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { useLanguage } from "@/contexts/LanguageContext";

interface Props { title: string; titleUrdu: string; sections: { h: string; hUrdu: string; p: string; pUrdu: string }[]; slug: string; }

export default function PolicyPage({ title, titleUrdu, sections, slug }: Props) {
  const { language } = useLanguage();
  return (
    <div className="min-h-screen bg-background">
      <SEOHead title={`${title} — KissanCares`} description={sections[0]?.p.slice(0, 150)} canonical={`/${slug}`} />
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-6">{language === "ru" ? titleUrdu : title}</h1>
        <div className="space-y-6">
          {sections.map((s, i) => (
            <section key={i} className="bg-card border border-border rounded-2xl p-5">
              <h2 className="font-bold text-lg text-foreground mb-2">{language === "ru" ? s.hUrdu : s.h}</h2>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{language === "ru" ? s.pUrdu : s.p}</p>
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
import WhatsAppFAB from "@/components/WhatsAppFAB";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";
import { useLanguage } from "@/contexts/LanguageContext";
import { videos, videoCategories } from "@/data/videosData";
import { Play, Clock } from "lucide-react";
import { useState } from "react";

export default function Videos() {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<string>("all");

  const filtered = activeTab === "all" ? videos : videos.filter(v => v.category === activeTab);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title="Agricultural Video Tutorials - Kissan Cares"
        description="Watch agricultural tutorials: spray techniques, fertilizer application, pest identification. Free farming videos in Urdu."
        canonical="https://kissancares.com/videos"
      />
      <Header />
      <main className="flex-1 pb-20 lg:pb-0">
        <Breadcrumbs items={[{ label: language === "ru" ? "Home" : "Home", to: "/" }, { label: language === "ru" ? "Videos" : "Videos" }]} />
        <div className="container py-8">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-sale/10 flex items-center justify-center mx-auto mb-4">
              <Play className="h-7 w-7 text-sale" />
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-foreground mb-2">
              {language === "ru" ? "Kissan Video Tutorials" : "Farming Video Tutorials"}
            </h1>
            <p className="text-sm text-muted-foreground">
              {language === "ru" ? "Maahireen se seekhein — bilkul muft" : "Learn from experts — completely free"}
            </p>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 justify-center mb-8 flex-wrap">
            {videoCategories.map(cat => (
              <button
                key={cat.key}
                onClick={() => setActiveTab(cat.key)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  activeTab === cat.key
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                {language === "ru" ? cat.labelUrdu : cat.label}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map(video => (
              <div key={video.id} className="premium-card overflow-hidden group">
                <div className="relative aspect-video bg-secondary/50">
                  <img
                    src={`https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`}
                    alt={language === "ru" ? video.titleUrdu : video.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-foreground/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-14 h-14 rounded-full bg-primary-foreground/90 flex items-center justify-center">
                      <Play className="h-6 w-6 text-foreground fill-current ml-1" />
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-foreground/80 text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1">
                    <Clock className="h-2.5 w-2.5" /> {video.duration}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-bold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                    {language === "ru" ? video.titleUrdu : video.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppFAB />
      <BottomNav />
    </div>
  );
}

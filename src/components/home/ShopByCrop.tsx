import { Link } from "react-router-dom";
import { cropCategories } from "@/data/mockData";
import { useScrollReveal } from "@/hooks/useAnimations";
import { useLanguage } from "@/contexts/LanguageContext";
import cropWheat from "@/assets/crop-wheat.jpg";
import cropCotton from "@/assets/crop-cotton.jpg";
import cropRice from "@/assets/crop-rice.jpg";
import cropMaize from "@/assets/crop-maize.jpg";
import cropSugarcane from "@/assets/crop-sugarcane.jpg";
import cropVegetables from "@/assets/crop-vegetables.jpg";
import { ArrowRight } from "lucide-react";

const images: Record<string, string> = {
  wheat: cropWheat, cotton: cropCotton, rice: cropRice,
  maize: cropMaize, sugarcane: cropSugarcane, vegetables: cropVegetables,
};

export default function ShopByCrop() {
  const ref = useScrollReveal();
  const { language, t } = useLanguage();

  return (
    <section className="py-12 md:py-16 bg-mesh">
      <div ref={ref} className="container reveal-section">
        <div className="text-center mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary/60 mb-2">{t("section.browseByCrop")}</p>
          <h2 className="text-2xl md:text-3xl font-extrabold text-foreground">
            {t("section.shopByCrop")} <span className="text-gradient-green">{t("section.cropType")}</span>
          </h2>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3 md:gap-4 stagger-children revealed">
          {cropCategories.map(crop => (
            <Link key={crop.slug} to={`/products?crop=${crop.slug}`} className="group text-center">
              <div className="relative aspect-square rounded-xl overflow-hidden shadow-card group-hover:shadow-elevated transition-all duration-300 group-hover:-translate-y-1 mb-2">
                <img src={images[crop.slug]} alt={crop.name} loading="lazy" width={512} height={512} className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-agri-deep/70 via-agri-deep/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-2.5">
                  <p className="text-sm font-bold text-primary-foreground drop-shadow-lg">{language === "ru" ? crop.nameRoman : crop.name}</p>
                  <p className="text-[10px] text-primary-foreground/70 font-medium" dir="rtl">{crop.nameUrdu}</p>
                </div>
                <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-primary-foreground/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <ArrowRight className="h-3 w-3 text-primary-foreground" />
                </div>
              </div>
              <p className="text-[10px] text-muted-foreground font-medium">{crop.productCount} {t("section.products")}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

import { Link } from "react-router-dom";
import { cropCategories } from "@/data/mockData";
import { useScrollReveal } from "@/hooks/useAnimations";
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

  return (
    <section className="py-14 md:py-20 bg-mesh">
      <div ref={ref} className="container reveal-section">
        <div className="text-center mb-10">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary/60 mb-2">Browse by Crop</p>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-foreground">
            Shop by <span className="text-gradient-green">Crop Type</span>
          </h2>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-4 md:gap-6 stagger-children revealed">
          {cropCategories.map(crop => (
            <Link
              key={crop.slug}
              to={`/products?crop=${crop.slug}`}
              className="group text-center"
            >
              <div className="relative aspect-square rounded-2xl overflow-hidden shadow-card group-hover:shadow-elevated transition-all duration-500 group-hover:-translate-y-2 mb-3">
                <img
                  src={images[crop.slug]}
                  alt={crop.name}
                  loading="lazy"
                  width={512}
                  height={512}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-agri-deep/70 via-agri-deep/20 to-transparent" />

                {/* Label on image */}
                <div className="absolute inset-x-0 bottom-0 p-3">
                  <p className="text-sm md:text-base font-bold text-white drop-shadow-lg">{crop.name}</p>
                  <p className="text-[10px] md:text-xs text-white/70 font-medium">{crop.nameUrdu}</p>
                </div>

                {/* Hover arrow indicator */}
                <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0 -translate-x-2">
                  <ArrowRight className="h-3.5 w-3.5 text-white" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

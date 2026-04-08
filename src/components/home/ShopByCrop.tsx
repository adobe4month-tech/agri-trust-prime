import { Link } from "react-router-dom";
import { cropCategories } from "@/data/mockData";
import cropWheat from "@/assets/crop-wheat.jpg";
import cropCotton from "@/assets/crop-cotton.jpg";
import cropRice from "@/assets/crop-rice.jpg";
import cropMaize from "@/assets/crop-maize.jpg";
import cropSugarcane from "@/assets/crop-sugarcane.jpg";
import cropVegetables from "@/assets/crop-vegetables.jpg";

const images: Record<string, string> = {
  wheat: cropWheat, cotton: cropCotton, rice: cropRice,
  maize: cropMaize, sugarcane: cropSugarcane, vegetables: cropVegetables,
};

export default function ShopByCrop() {
  return (
    <section className="container py-10">
      <h2 className="text-xl md:text-2xl font-bold text-foreground mb-6">Shop by Crop</h2>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-3 md:gap-4">
        {cropCategories.map(crop => (
          <Link
            key={crop.slug}
            to={`/products?crop=${crop.slug}`}
            className="group text-center"
          >
            <div className="aspect-square rounded-xl overflow-hidden shadow-card group-hover:shadow-elevated transition-shadow mb-2">
              <img
                src={images[crop.slug]}
                alt={crop.name}
                loading="lazy"
                width={512}
                height={512}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <p className="text-sm font-semibold text-foreground">{crop.name}</p>
            <p className="text-xs text-muted-foreground">{crop.nameUrdu}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

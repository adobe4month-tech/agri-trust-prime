import { reviews, stats } from "@/data/mockData";
import { Star, BadgeCheck, Users } from "lucide-react";

export default function FeaturedReviews() {
  return (
    <section className="bg-secondary/50 py-10">
      <div className="container">
        {/* Stats */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-3">
            <Users className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">Trusted by farmers across Pakistan</span>
          </div>
          <div className="flex items-center justify-center gap-6 md:gap-12">
            <div>
              <p className="text-2xl md:text-3xl font-bold text-foreground">{stats.totalFarmers.toLocaleString()}+</p>
              <p className="text-xs text-muted-foreground">Happy Farmers</p>
            </div>
            <div className="w-px h-10 bg-border" />
            <div>
              <p className="text-2xl md:text-3xl font-bold text-foreground">{stats.productsDelivered.toLocaleString()}+</p>
              <p className="text-xs text-muted-foreground">Products Delivered</p>
            </div>
            <div className="w-px h-10 bg-border" />
            <div>
              <p className="text-2xl md:text-3xl font-bold text-foreground">{stats.citiesCovered}+</p>
              <p className="text-xs text-muted-foreground">Cities Covered</p>
            </div>
          </div>
        </div>

        <h2 className="text-xl md:text-2xl font-bold text-foreground mb-6 text-center">What Farmers Say</h2>

        <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {reviews.slice(0, 3).map(review => (
            <div key={review.id} className="bg-card rounded-xl p-5 shadow-card">
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`h-4 w-4 ${i < review.rating ? "fill-agri-gold text-agri-gold" : "text-border"}`} />
                ))}
              </div>
              <p className="text-sm text-foreground mb-4 leading-relaxed">"{review.text}"</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-foreground">{review.name}</p>
                  <p className="text-xs text-muted-foreground">{review.location} • {review.crop}</p>
                </div>
                {review.verified && (
                  <BadgeCheck className="h-5 w-5 text-primary shrink-0" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

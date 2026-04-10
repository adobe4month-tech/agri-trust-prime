import { reviews, stats } from "@/data/mockData";
import { Star, BadgeCheck, MapPin } from "lucide-react";
import { useScrollReveal, useAnimatedCounter } from "@/hooks/useAnimations";

function StatCounter({ target, label, suffix = "+" }: { target: number; label: string; suffix?: string }) {
  const { ref, count } = useAnimatedCounter(target);
  return (
    <div ref={ref} className="text-center">
      <p className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-gradient-gold leading-none">
        {count.toLocaleString()}{suffix}
      </p>
      <p className="text-[10px] md:text-xs text-muted-foreground font-medium mt-1 uppercase tracking-wider">{label}</p>
    </div>
  );
}

export default function FeaturedReviews() {
  const ref = useScrollReveal();
  const reviewsRef = useScrollReveal();

  return (
    <section className="py-12 md:py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />

      <div className="container relative">
        {/* Stats */}
        <div ref={ref} className="reveal-section mb-12">
          <div className="text-center mb-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary/60 mb-2">Our Impact</p>
            <h2 className="text-2xl md:text-3xl font-extrabold text-foreground">
              Trusted by <span className="text-gradient-green">Farmers Across Pakistan</span>
            </h2>
          </div>

          <div className="premium-card rounded-2xl p-6 md:p-10 max-w-2xl mx-auto">
            <div className="grid grid-cols-3 gap-4">
              <StatCounter target={stats.totalFarmers} label="Happy Farmers" />
              <StatCounter target={stats.productsDelivered} label="Products Delivered" />
              <StatCounter target={stats.citiesCovered} label="Cities Covered" />
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div ref={reviewsRef} className="reveal-section">
          <div className="text-center mb-6">
            <h3 className="text-xl md:text-2xl font-extrabold text-foreground">
              What <span className="text-gradient-gold">Farmers Say</span>
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto stagger-children revealed">
            {reviews.slice(0, 3).map(review => (
              <div key={review.id} className="premium-card p-5 relative">
                <div className="absolute top-3 right-3 text-3xl text-primary/10 font-serif leading-none">"</div>

                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-3.5 w-3.5 ${i < review.rating ? "fill-agri-gold text-agri-gold" : "fill-muted text-muted"}`} />
                  ))}
                </div>
                <p className="text-sm text-foreground leading-relaxed mb-4 italic">"{review.text}"</p>

                <div className="flex items-center justify-between border-t border-border/50 pt-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center">
                      <span className="text-primary-foreground font-bold text-xs">{review.name.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-foreground">{review.name}</p>
                      <p className="text-[10px] text-muted-foreground flex items-center gap-0.5">
                        <MapPin className="h-2.5 w-2.5" /> {review.location}
                      </p>
                    </div>
                  </div>
                  {review.verified && (
                    <div className="flex flex-col items-end">
                      <div className="flex items-center gap-1 text-primary">
                        <BadgeCheck className="h-3.5 w-3.5" />
                        <span className="text-[9px] font-bold">Verified Purchase</span>
                      </div>
                      {review.orderId && (
                        <span className="text-[8px] text-muted-foreground">Order #{review.orderId}</span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

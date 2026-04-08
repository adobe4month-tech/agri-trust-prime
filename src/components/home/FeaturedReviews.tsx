import { reviews, stats } from "@/data/mockData";
import { Star, BadgeCheck, Users, TrendingUp, MapPin } from "lucide-react";
import { useScrollReveal, useAnimatedCounter } from "@/hooks/useAnimations";

function StatCounter({ target, label, suffix = "+" }: { target: number; label: string; suffix?: string }) {
  const { ref, count } = useAnimatedCounter(target);
  return (
    <div ref={ref} className="text-center">
      <p className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gradient-gold leading-none">
        {count.toLocaleString()}{suffix}
      </p>
      <p className="text-xs md:text-sm text-muted-foreground font-medium mt-1.5 uppercase tracking-wider">{label}</p>
    </div>
  );
}

export default function FeaturedReviews() {
  const ref = useScrollReveal();
  const reviewsRef = useScrollReveal();

  return (
    <section className="py-14 md:py-24 relative overflow-hidden">
      {/* Background mesh */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-agri-light to-background" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[150px]" />

      <div className="container relative">
        {/* Stats with animated counters */}
        <div ref={ref} className="reveal-section mb-16">
          <div className="text-center mb-10">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary/60 mb-2">Our Impact</p>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-foreground">
              Trusted by <span className="text-gradient-green">Farmers Across Pakistan</span>
            </h2>
          </div>

          <div className="glass-card rounded-2xl p-8 md:p-12 max-w-3xl mx-auto">
            <div className="grid grid-cols-3 gap-6">
              <StatCounter target={stats.totalFarmers} label="Happy Farmers" />
              <StatCounter target={stats.productsDelivered} label="Products Delivered" />
              <StatCounter target={stats.citiesCovered} label="Cities Covered" />
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div ref={reviewsRef} className="reveal-section">
          <div className="text-center mb-8">
            <h3 className="text-xl md:text-2xl font-extrabold text-foreground">
              What <span className="text-gradient-gold">Farmers Say</span>
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto stagger-children revealed">
            {reviews.slice(0, 3).map(review => (
              <div key={review.id} className="premium-card p-6 relative">
                {/* Quote mark */}
                <div className="absolute top-4 right-4 text-4xl text-primary/10 font-serif leading-none">"</div>

                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-4 w-4 ${i < review.rating ? "fill-agri-gold text-agri-gold" : "fill-muted text-muted"}`} />
                  ))}
                </div>
                <p className="text-sm text-foreground leading-relaxed mb-5 italic">"{review.text}"</p>

                <div className="flex items-center justify-between border-t pt-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-trust-green flex items-center justify-center">
                      <span className="text-white font-bold text-sm">{review.name.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-foreground">{review.name}</p>
                      <p className="text-[11px] text-muted-foreground flex items-center gap-1">
                        <MapPin className="h-3 w-3" /> {review.location}
                      </p>
                    </div>
                  </div>
                  {review.verified && (
                    <div className="flex items-center gap-1 text-primary glow-pulse rounded-full px-2 py-0.5 bg-primary/5">
                      <BadgeCheck className="h-4 w-4" />
                      <span className="text-[10px] font-bold">Verified</span>
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

import { useParams, Link } from "react-router-dom";
import { products, reviews } from "@/data/mockData";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import Footer from "@/components/Footer";
import WhatsAppFAB from "@/components/WhatsAppFAB";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ShieldCheck, Truck, ChevronLeft, ShoppingCart, MessageCircle, BadgeCheck, MapPin, Package, Clock } from "lucide-react";
import { useState } from "react";
import { useScrollReveal } from "@/hooks/useAnimations";

export default function ProductDetailPage() {
  const { slug } = useParams();
  const product = products.find(p => p.slug === slug);
  const [selectedImage, setSelectedImage] = useState(0);
  const [qty, setQty] = useState(1);
  const specsRef = useScrollReveal();
  const reviewsRef = useScrollReveal();

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container py-20 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Product Not Found</h2>
          <Link to="/" className="text-primary hover:underline">Go back to Home</Link>
        </main>
        <Footer />
        <BottomNav />
      </div>
    );
  }

  const images = [product.image, product.image2].filter(Boolean) as string[];
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  const relatedReviews = reviews.filter(r => product.targetCrops?.includes(r.crop)).slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 pb-28 lg:pb-0">
        {/* Breadcrumb */}
        <div className="container py-4">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Link to="/" className="hover:text-primary flex items-center gap-1 transition-colors"><ChevronLeft className="h-3 w-3" /> Home</Link>
            <span className="text-border">/</span>
            <span className="capitalize">{product.category}</span>
            <span className="text-border">/</span>
            <span className="text-foreground font-semibold truncate">{product.name}</span>
          </div>
        </div>

        <div className="container">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14">
            {/* Image Gallery */}
            <div className="animate-fade-in">
              <div className="premium-card overflow-hidden mb-4 aspect-square bg-gradient-to-br from-secondary/50 to-muted/50">
                <img
                  src={images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-contain p-8 transition-transform duration-500 hover:scale-105"
                />
              </div>
              {images.length > 1 && (
                <div className="flex gap-3">
                  {images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className={`w-20 h-20 rounded-xl overflow-hidden transition-all duration-300 ${
                        selectedImage === i
                          ? "ring-2 ring-primary ring-offset-2 shadow-glow-green"
                          : "border border-border hover:border-primary/30"
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-contain p-2" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6" style={{ animation: "hero-text-reveal 0.8s ease-out 0.2s both" }}>
              <div>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-[0.15em] mb-2">{product.brand}</p>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-foreground leading-tight">{product.name}</h1>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-5 w-5 ${i < Math.floor(product.rating) ? "fill-agri-gold text-agri-gold" : "fill-muted text-muted"}`} />
                  ))}
                </div>
                <span className="text-sm font-bold text-foreground">{product.rating}</span>
                <span className="text-sm text-muted-foreground">({product.reviewCount} reviews)</span>
              </div>

              {/* Credibility Badges — premium glass style */}
              <div className="flex flex-wrap gap-2.5">
                {product.badges.map(badge => (
                  <div key={badge} className="glass-card rounded-xl px-4 py-2.5 flex items-center gap-2 glow-pulse">
                    <ShieldCheck className="h-4 w-4 text-primary" />
                    <span className="text-xs font-bold text-foreground">{badge}</span>
                  </div>
                ))}
              </div>

              {/* Price block */}
              <div className="premium-card p-5 bg-gradient-to-r from-secondary/80 to-muted/50">
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-4xl font-extrabold text-foreground">Rs.{product.price.toLocaleString()}</span>
                  {discount > 0 && (
                    <>
                      <span className="text-lg text-muted-foreground line-through">Rs.{product.originalPrice.toLocaleString()}</span>
                      <Badge className="bg-sale text-white font-bold px-2.5 py-1 text-xs shadow-lg">-{discount}% OFF</Badge>
                    </>
                  )}
                </div>
                <div className="flex flex-wrap gap-4 mt-3">
                  {product.freeDelivery && (
                    <div className="flex items-center gap-2 text-sm text-primary font-semibold">
                      <Truck className="h-4 w-4" /> Free Delivery
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Package className="h-4 w-4" /> In Stock
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" /> Ships in 24hrs
                  </div>
                </div>
              </div>

              {/* Description */}
              {product.shortDescription && (
                <p className="text-foreground/80 leading-relaxed text-base">{product.shortDescription}</p>
              )}

              {/* Quantity + Dual CTA */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-bold text-foreground">Quantity:</span>
                  <div className="flex items-center rounded-xl overflow-hidden border-2 border-border">
                    <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-4 py-2.5 text-foreground hover:bg-secondary transition-colors font-bold">−</button>
                    <span className="px-5 py-2.5 text-sm font-bold text-foreground border-x-2 border-border bg-secondary/30">{qty}</span>
                    <button onClick={() => setQty(qty + 1)} className="px-4 py-2.5 text-foreground hover:bg-secondary transition-colors font-bold">+</button>
                  </div>
                </div>

                {/* Dual CTA — Premium buttons */}
                <div className="flex gap-3">
                  <Button variant="hero" size="xl" className="flex-1 btn-glow">
                    <ShoppingCart className="h-5 w-5" /> Add to Cart
                  </Button>
                  <Button asChild variant="whatsapp" size="xl" className="flex-1">
                    <a
                      href={`https://wa.me/923240287276?text=Hi, I'm interested in ${product.name} (Rs.${product.price}). Please share details.`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle className="h-5 w-5" /> Ask Agronomist
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Technical Specs Matrix — premium table */}
          <div ref={specsRef} className="reveal-section mt-14">
            <h2 className="text-xl md:text-2xl font-extrabold text-foreground mb-6 flex items-center gap-3">
              <div className="w-1 h-7 rounded-full bg-gradient-to-b from-primary to-trust-green" />
              Technical Specifications
            </h2>
            <div className="premium-card overflow-hidden">
              <div className="divide-y divide-border/50">
                {[
                  { label: "Active Ingredient", value: product.activeIngredient },
                  { label: "Dosage / Acre", value: product.dosagePerAcre },
                  { label: "Application Method", value: product.applicationMethod },
                  { label: "Target Crops", value: product.targetCrops?.join(", ") },
                  { label: "Brand", value: product.brand },
                  { label: "Category", value: product.category },
                ].filter(r => r.value).map((row, i) => (
                  <div key={i} className={`flex items-center px-6 py-4 transition-colors hover:bg-secondary/30 ${i % 2 === 0 ? "bg-secondary/10" : ""}`}>
                    <span className="text-sm text-muted-foreground font-semibold w-44 shrink-0">{row.label}</span>
                    <span className="text-sm font-bold text-foreground capitalize">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          {relatedReviews.length > 0 && (
            <div ref={reviewsRef} className="reveal-section mt-14 mb-14">
              <h2 className="text-xl md:text-2xl font-extrabold text-foreground mb-6 flex items-center gap-3">
                <div className="w-1 h-7 rounded-full bg-gradient-to-b from-agri-gold to-accent" />
                Customer Reviews
              </h2>
              <div className="grid md:grid-cols-3 gap-5 stagger-children revealed">
                {relatedReviews.map(review => (
                  <div key={review.id} className="premium-card p-6 relative">
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
                        <div className="flex items-center gap-1 text-primary rounded-full px-2 py-0.5 bg-primary/5">
                          <BadgeCheck className="h-4 w-4" />
                          <span className="text-[10px] font-bold">Verified</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
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

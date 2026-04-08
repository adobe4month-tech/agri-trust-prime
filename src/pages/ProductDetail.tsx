import { useParams, Link } from "react-router-dom";
import { products, reviews } from "@/data/mockData";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import Footer from "@/components/Footer";
import WhatsAppFAB from "@/components/WhatsAppFAB";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ShieldCheck, Truck, ChevronLeft, ShoppingCart, MessageCircle, BadgeCheck } from "lucide-react";
import { useState } from "react";

export default function ProductDetailPage() {
  const { slug } = useParams();
  const product = products.find(p => p.slug === slug);
  const [selectedImage, setSelectedImage] = useState(0);
  const [qty, setQty] = useState(1);

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
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pb-24 lg:pb-0">
        {/* Breadcrumb */}
        <div className="container py-3">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Link to="/" className="hover:text-primary flex items-center gap-1"><ChevronLeft className="h-3 w-3" /> Home</Link>
            <span>/</span>
            <span className="capitalize">{product.category}</span>
            <span>/</span>
            <span className="text-foreground font-medium truncate">{product.name}</span>
          </div>
        </div>

        <div className="container">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Image Gallery */}
            <div>
              <div className="bg-card rounded-xl overflow-hidden shadow-card mb-3 aspect-square">
                <img
                  src={images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-contain p-6"
                />
              </div>
              {images.length > 1 && (
                <div className="flex gap-2">
                  {images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                        selectedImage === i ? "border-primary" : "border-border"
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-contain p-2" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-5">
              <div>
                <p className="text-sm text-muted-foreground mb-1">{product.brand}</p>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground leading-tight">{product.name}</h1>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-5 w-5 ${i < Math.floor(product.rating) ? "fill-agri-gold text-agri-gold" : "text-border"}`} />
                  ))}
                </div>
                <span className="text-sm font-semibold text-foreground">{product.rating}</span>
                <span className="text-sm text-muted-foreground">({product.reviewCount} reviews)</span>
              </div>

              {/* Credibility Badges — 🆕 20% Upgrade */}
              <div className="flex flex-wrap gap-2">
                {product.badges.map(badge => (
                  <Badge key={badge} className="bg-secondary text-secondary-foreground gap-1.5 px-3 py-1.5">
                    <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                    {badge}
                  </Badge>
                ))}
              </div>

              {/* Price */}
              <div className="bg-secondary rounded-xl p-4">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-extrabold text-foreground">Rs.{product.price.toLocaleString()}</span>
                  {discount > 0 && (
                    <>
                      <span className="text-lg text-muted-foreground line-through">Rs.{product.originalPrice.toLocaleString()}</span>
                      <Badge className="bg-sale text-primary-foreground font-bold">-{discount}%</Badge>
                    </>
                  )}
                </div>
                {product.freeDelivery && (
                  <div className="flex items-center gap-2 mt-2 text-sm text-primary font-medium">
                    <Truck className="h-4 w-4" /> Free Delivery Nationwide
                  </div>
                )}
              </div>

              {/* Description */}
              {product.shortDescription && (
                <p className="text-foreground leading-relaxed">{product.shortDescription}</p>
              )}

              {/* Technical Specs Matrix — 🆕 20% Upgrade */}
              <div className="bg-card rounded-xl border overflow-hidden">
                <h3 className="text-sm font-semibold text-foreground px-4 py-3 bg-secondary border-b">
                  Technical Specifications
                </h3>
                <div className="divide-y">
                  {product.activeIngredient && (
                    <div className="flex px-4 py-3">
                      <span className="text-sm text-muted-foreground w-40 shrink-0">Active Ingredient</span>
                      <span className="text-sm font-medium text-foreground">{product.activeIngredient}</span>
                    </div>
                  )}
                  {product.dosagePerAcre && (
                    <div className="flex px-4 py-3">
                      <span className="text-sm text-muted-foreground w-40 shrink-0">Dosage / Acre</span>
                      <span className="text-sm font-medium text-foreground">{product.dosagePerAcre}</span>
                    </div>
                  )}
                  {product.applicationMethod && (
                    <div className="flex px-4 py-3">
                      <span className="text-sm text-muted-foreground w-40 shrink-0">Application Method</span>
                      <span className="text-sm font-medium text-foreground">{product.applicationMethod}</span>
                    </div>
                  )}
                  {product.targetCrops && product.targetCrops.length > 0 && (
                    <div className="flex px-4 py-3">
                      <span className="text-sm text-muted-foreground w-40 shrink-0">Target Crops</span>
                      <span className="text-sm font-medium text-foreground">{product.targetCrops.join(", ")}</span>
                    </div>
                  )}
                  <div className="flex px-4 py-3">
                    <span className="text-sm text-muted-foreground w-40 shrink-0">Brand</span>
                    <span className="text-sm font-medium text-foreground">{product.brand}</span>
                  </div>
                  <div className="flex px-4 py-3">
                    <span className="text-sm text-muted-foreground w-40 shrink-0">Category</span>
                    <span className="text-sm font-medium text-foreground capitalize">{product.category}</span>
                  </div>
                </div>
              </div>

              {/* Quantity + Dual CTA */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-foreground">Qty:</span>
                  <div className="flex items-center border rounded-lg overflow-hidden">
                    <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-3 py-2 text-foreground hover:bg-secondary transition-colors">−</button>
                    <span className="px-4 py-2 text-sm font-semibold text-foreground border-x">{qty}</span>
                    <button onClick={() => setQty(qty + 1)} className="px-3 py-2 text-foreground hover:bg-secondary transition-colors">+</button>
                  </div>
                </div>

                {/* Dual CTA — Key conversion driver */}
                <div className="flex gap-3">
                  <Button size="lg" className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90 font-bold shadow-lg text-base">
                    <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    className="flex-1 bg-whatsapp text-primary-foreground hover:bg-whatsapp/90 font-bold shadow-lg text-base"
                  >
                    <a
                      href={`https://wa.me/923240287276?text=Hi, I'm interested in ${product.name} (Rs.${product.price}). Please share details.`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle className="mr-2 h-5 w-5" /> Ask Agronomist
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          {relatedReviews.length > 0 && (
            <div className="mt-12 mb-10">
              <h2 className="text-xl font-bold text-foreground mb-6">Customer Reviews</h2>
              <div className="grid md:grid-cols-3 gap-4">
                {relatedReviews.map(review => (
                  <div key={review.id} className="bg-card rounded-xl p-5 shadow-card border">
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-4 w-4 ${i < review.rating ? "fill-agri-gold text-agri-gold" : "text-border"}`} />
                      ))}
                    </div>
                    <p className="text-sm text-foreground mb-4">"{review.text}"</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold text-foreground">{review.name}</p>
                        <p className="text-xs text-muted-foreground">{review.location}</p>
                      </div>
                      {review.verified && <BadgeCheck className="h-5 w-5 text-primary" />}
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

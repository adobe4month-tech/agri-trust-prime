import { useParams, Link } from "react-router-dom";
import { products, reviews } from "@/data/mockData";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import Footer from "@/components/Footer";
import WhatsAppFAB from "@/components/WhatsAppFAB";
import ProductCard from "@/components/ProductCard";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";
import ShareButtons from "@/components/ShareButtons";
import DeliveryEstimate from "@/components/DeliveryEstimate";
import GuaranteeBadge from "@/components/GuaranteeBadge";
import BundleDeal from "@/components/BundleDeal";
import StickyPDPBar from "@/components/StickyPDPBar";
import ScarcityIndicator from "@/components/ScarcityIndicator";
import CountdownTimer from "@/components/CountdownTimer";
import PhotoReviews from "@/components/PhotoReviews";
import ProductQA from "@/components/ProductQA";
import ProductVariants from "@/components/ProductVariants";
import CertificatesSection from "@/components/CertificatesSection";
import { useLanguage } from "@/contexts/LanguageContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ShieldCheck, Truck, ShoppingCart, MessageCircle, BadgeCheck, MapPin, Package, Clock, Eye, Flame, Tag, AlertTriangle, Heart, Users } from "lucide-react";
import { useState, useEffect } from "react";
import { useScrollReveal } from "@/hooks/useAnimations";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

export default function ProductDetailPage() {
  const { slug } = useParams();
  const product = products.find(p => p.slug === slug);
  const [selectedImage, setSelectedImage] = useState(0);
  const [qty, setQty] = useState(1);
  const specsRef = useScrollReveal();
  const reviewsRef = useScrollReveal();
  const { language, t } = useLanguage();
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();

  const handleWishlistToggle = () => {
    if (!product) return;
    toggleWishlist(product.id);
    toast.success(isWishlisted(product.id)
      ? (language === "ru" ? "Pasand se hataya" : "Removed from wishlist")
      : (language === "ru" ? "Pasand mein daala!" : "Added to wishlist!")
    );
  };

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product, qty);
    toast.success(language === "ru" ? `${product.nameUrdu} cart mein daal diya!` : `${product.name} added to cart!`);
  };

  // Save to recently viewed
  useEffect(() => {
    if (!product) return;
    try {
      const stored = localStorage.getItem("kc-recent");
      let ids: number[] = stored ? JSON.parse(stored) : [];
      ids = [product.id, ...ids.filter(id => id !== product.id)].slice(0, 8);
      localStorage.setItem("kc-recent", JSON.stringify(ids));
    } catch {}
  }, [product]);

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
  const relatedProducts = products.filter(p => p.id !== product.id && p.category === product.category).slice(0, 4);
  const crossSellProducts = products.filter(p => p.id !== product.id && p.category !== product.category).slice(0, 3);
  const productName = language === "ru" ? product.nameUrdu : product.name;
  const description = language === "ru" ? (product.shortDescriptionUrdu || product.shortDescription) : product.shortDescription;
  const lowStock = product.stockCount <= 15;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title={`${product.name} - Buy Online | Rs.${product.price.toLocaleString()}`}
        description={product.shortDescription || `Buy ${product.name} online at Rs.${product.price} from Kissan Cares. Original product, cash on delivery.`}
        canonical={`https://kissancares.com/product/${product.slug}`}
        ogImage={product.image}
        ogType="product"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: product.name,
          image: product.image,
          description: product.shortDescription,
          brand: { "@type": "Brand", name: product.brand },
          offers: {
            "@type": "Offer",
            price: product.price,
            priceCurrency: "PKR",
            availability: "https://schema.org/InStock",
          },
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: product.rating,
            reviewCount: product.reviewCount,
          },
        }}
      />
      <Header />
      <main className="flex-1 pb-28 lg:pb-0">
        <Breadcrumbs items={[
          { label: t("nav.home"), to: "/" },
          { label: product.category.charAt(0).toUpperCase() + product.category.slice(1), to: `/products?category=${product.category}` },
          { label: productName },
        ]} />

        <div className="container">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Image Gallery */}
            <div style={{ animation: "fade-up 0.4s ease-out both" }}>
              <div className="premium-card overflow-hidden mb-3 aspect-square bg-secondary/30">
                <img
                  src={images[selectedImage]}
                  alt={productName}
                  className="w-full h-full object-contain p-6 transition-transform duration-300 hover:scale-105"
                />
              </div>
              {images.length > 1 && (
                <div className="flex gap-2">
                  {images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className={`w-16 h-16 rounded-lg overflow-hidden transition-all duration-200 ${
                        selectedImage === i
                          ? "ring-2 ring-primary ring-offset-2"
                          : "border border-border hover:border-primary/30"
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-contain p-1" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-5" style={{ animation: "fade-up 0.4s ease-out 0.1s both" }}>
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1.5">{product.brand}</p>
                <h1 className="text-xl md:text-2xl lg:text-3xl font-extrabold text-foreground leading-tight">{productName}</h1>
              </div>

              {/* Rating + Sold + Watching */}
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? "fill-agri-gold text-agri-gold" : "fill-muted text-muted"}`} />
                  ))}
                  <span className="text-sm font-bold text-foreground ml-1">{product.rating}</span>
                  <span className="text-xs text-muted-foreground">({product.reviewCount})</span>
                </div>
                <div className="sold-badge">
                  <Flame className="h-3 w-3" /> {product.soldCount.toLocaleString()} {t("product.sold")}
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Eye className="h-3.5 w-3.5" /> {product.watchingCount} {t("product.watching")}
                </div>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                {product.badges.map(badge => (
                  <Badge key={badge} variant="secondary" className="text-xs px-3 py-1 bg-primary/5 text-primary border border-primary/10 font-semibold">
                    <ShieldCheck className="h-3 w-3 mr-1" /> {badge}
                  </Badge>
                ))}
              </div>

              {/* Stock urgency */}
              {lowStock && (
                <div className="bg-sale/10 border border-sale/20 rounded-lg px-4 py-2.5 flex items-center gap-2 animate-pulse-soft">
                  <AlertTriangle className="h-4 w-4 text-sale shrink-0" />
                  <p className="text-xs font-bold text-sale">
                    {t("product.onlyLeft")} {product.stockCount} {t("product.left")}
                  </p>
                </div>
              )}

              {/* First Purchase Discount Banner */}
              <div className="bg-accent/10 border border-accent/20 rounded-lg px-4 py-2.5 flex items-center gap-2">
                <Tag className="h-4 w-4 text-accent shrink-0" />
                <p className="text-xs font-semibold text-accent">
                  {t("product.firstPurchase")} <span className="font-extrabold">KISSAN10</span> {t("product.forDiscount")}
                </p>
              </div>

              {/* Guarantee Badge */}
              <GuaranteeBadge variant="full" />

              {/* Daily buyers count */}
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Users className="h-3.5 w-3.5 text-primary" />
                <span className="font-semibold">
                  {language === "ru"
                    ? `Aaj ${Math.floor(product.soldCount / 30)} logon ne khareeda`
                    : `${Math.floor(product.soldCount / 30)} people bought this today`}
                </span>
              </div>

              {/* Price block */}
              <div className="premium-card p-4 bg-secondary/30">
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-3xl font-extrabold text-foreground">Rs.{product.price.toLocaleString()}</span>
                  {discount > 0 && (
                    <>
                      <span className="text-base text-muted-foreground line-through">Rs.{product.originalPrice.toLocaleString()}</span>
                      <Badge className="bg-sale text-primary-foreground font-bold px-2 py-0.5 text-[11px]">-{discount}% OFF</Badge>
                    </>
                  )}
                </div>
                <div className="flex flex-wrap gap-4 mt-2">
                  {product.freeDelivery && (
                    <div className="flex items-center gap-1.5 text-xs text-primary font-semibold">
                      <Truck className="h-3.5 w-3.5" /> {t("trust.freeDelivery")}
                    </div>
                  )}
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Package className="h-3.5 w-3.5" /> {t("product.inStock")}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" /> {t("product.shipsIn24")}
                  </div>
                </div>
              </div>

              {/* Bulk Discount Table */}
              <div className="premium-card p-4 bg-primary/3 border-primary/10">
                <p className="text-xs font-extrabold text-foreground mb-2">
                  {language === "ru" ? "Zyada Khareedein, Zyada Bachaayein!" : "Buy More, Save More!"}
                </p>
                <div className="grid grid-cols-3 gap-2 text-center">
                  {[
                    { qty: "1", discount: "0%", label: language === "ru" ? "Ek" : "1 Unit" },
                    { qty: "3+", discount: "10%", label: language === "ru" ? "3 ya zyada" : "3+ Units" },
                    { qty: "5+", discount: "15%", label: language === "ru" ? "5 ya zyada" : "5+ Units" },
                  ].map((tier, i) => (
                    <div key={i} className={`rounded-lg p-2.5 border ${i === 2 ? "bg-primary/10 border-primary/20" : "bg-secondary/50 border-border/50"}`}>
                      <p className="text-lg font-extrabold text-foreground">{tier.discount === "0%" ? "—" : tier.discount}</p>
                      <p className="text-[10px] font-semibold text-muted-foreground">{tier.label}</p>
                      {tier.discount !== "0%" && (
                        <p className="text-[10px] font-bold text-primary mt-0.5">
                          Rs.{Math.round(product.price * (1 - parseInt(tier.discount) / 100)).toLocaleString()}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Description */}
              {description && (
                <p className="text-foreground/80 leading-relaxed text-sm">{description}</p>
              )}

              {/* Quantity + Dual CTA */}
              <div className="space-y-3 pt-1">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-foreground">{t("product.qty")}</span>
                  <div className="flex items-center rounded-lg overflow-hidden border border-border">
                    <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-3.5 py-2 text-foreground hover:bg-secondary transition-colors font-bold text-sm">−</button>
                    <span className="px-4 py-2 text-sm font-bold text-foreground border-x border-border bg-secondary/30">{qty}</span>
                    <button onClick={() => setQty(qty + 1)} className="px-3.5 py-2 text-foreground hover:bg-secondary transition-colors font-bold text-sm">+</button>
                  </div>
                </div>

                <div id="pdp-main-cta" className="flex gap-3">
                  {product.stockStatus === "sold-out" || product.stockStatus === "coming-soon" ? (
                    <Button asChild variant="whatsapp" size="lg" className="flex-1">
                      <a
                        href={`https://wa.me/923240287276?text=${encodeURIComponent(
                          language === "ru"
                            ? `Salaam! Mujhe ${product.nameUrdu} stock mein aane par WhatsApp par batayein.`
                            : `Hello! Please notify me when ${product.name} is back in stock.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <MessageCircle className="h-4 w-4" />
                        {product.stockStatus === "coming-soon"
                          ? (language === "ru" ? "Aane Par Batayein" : "Notify When Available")
                          : (language === "ru" ? "Stock Aane Par Batayein" : "Notify When In Stock")}
                      </a>
                    </Button>
                  ) : (
                    <Button variant="hero" size="lg" className="flex-1" onClick={handleAddToCart}>
                      <ShoppingCart className="h-4 w-4" /> {t("product.addToCart")}
                    </Button>
                  )}
                  <Button variant="outline" size="lg" onClick={handleWishlistToggle} className={isWishlisted(product.id) ? "text-sale border-sale/30" : ""}>
                    <Heart className={`h-4 w-4 ${isWishlisted(product.id) ? "fill-current" : ""}`} />
                  </Button>
                </div>
                <Button asChild variant="whatsapp" size="lg" className="w-full">
                  <a
                    href={`https://wa.me/923240287276?text=${encodeURIComponent(`Hi, I'm interested in ${product.name} (Rs.${product.price}). Please share details.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="h-4 w-4" /> {t("product.askAgronomist")}
                  </a>
                </Button>
              </div>

              {/* Share */}
              <ShareButtons productName={product.name} price={product.price} />

              {/* Delivery estimate */}
              <DeliveryEstimate />
            </div>
          </div>

          {/* Technical Specs */}
          <div ref={specsRef} className="reveal-section mt-12">
            <h2 className="text-lg md:text-xl font-extrabold text-foreground mb-4 flex items-center gap-2">
              <div className="w-1 h-6 rounded-full bg-gradient-to-b from-primary to-trust-green" />
              {t("product.techSpecs")}
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
                  <div key={i} className={`flex items-center px-5 py-3.5 ${i % 2 === 0 ? "bg-secondary/20" : ""}`}>
                    <span className="text-xs text-muted-foreground font-semibold w-40 shrink-0">{row.label}</span>
                    <span className="text-sm font-bold text-foreground capitalize">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bundle Deal */}
          <div className="mt-12">
            <BundleDeal currentProduct={product} />
          </div>

          {/* Cross-sell */}
          {crossSellProducts.length > 0 && (
            <div className="mt-12">
              <h2 className="text-lg md:text-xl font-extrabold text-foreground mb-4 flex items-center gap-2">
                <div className="w-1 h-6 rounded-full bg-gradient-to-b from-accent to-agri-gold" />
                {t("crossSell.title")}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {crossSellProducts.map(p => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          )}

          {/* Reviews */}
          {relatedReviews.length > 0 && (
            <div ref={reviewsRef} className="reveal-section mt-12">
              <h2 className="text-lg md:text-xl font-extrabold text-foreground mb-4 flex items-center gap-2">
                <div className="w-1 h-6 rounded-full bg-gradient-to-b from-agri-gold to-accent" />
                {t("product.customerReviews")}
              </h2>
              <div className="grid md:grid-cols-3 gap-4 stagger-children revealed">
                {relatedReviews.map(review => (
                  <div key={review.id} className="premium-card p-5 relative">
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-3.5 w-3.5 ${i < review.rating ? "fill-agri-gold text-agri-gold" : "fill-muted text-muted"}`} />
                      ))}
                    </div>
                    <p className="text-sm text-foreground leading-relaxed mb-4 italic">"{review.text}"</p>
                    <div className="flex items-center justify-between border-t border-border/50 pt-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
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
                        <div className="flex items-center gap-1 text-primary text-[9px] font-bold">
                          <BadgeCheck className="h-3.5 w-3.5" /> {t("common.verifiedPurchase")}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-12 mb-12">
              <h2 className="text-lg md:text-xl font-extrabold text-foreground mb-4">{t("product.relatedProducts")}</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {relatedProducts.map(p => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sticky Mobile CTA */}
        <StickyPDPBar product={product} onAddToCart={handleAddToCart} />
      </main>
      <Footer />
      <WhatsAppFAB />
      <BottomNav />
    </div>
  );
}
